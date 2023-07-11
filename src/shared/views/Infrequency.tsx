import { useParams, useSearchParams } from "react-router-dom";
import { useDebounce, useValueTabs } from "../hooks";
import { useAppThemeContext, usePaginationContext } from "../contexts";
import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { iInfrequency, iheadCell } from "../interfaces";
import { apiFrequency } from "../services";
import { Box, TableCell, TableRow } from "@mui/material";
import { TableBase, TabsYear } from "../components";
import { defineBgColorInfrequency } from "../scripts";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import utc from "dayjs/plugin/utc";
import { TabsPeriod } from "../components/tabs/Period";
dayjs.locale("pt-br");
dayjs.extend(utc);

export const ViewInfrequency = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { school_id } = useParams();
  const year_id = searchParams.get("year_id") || undefined;
  const period = searchParams.get("period") || undefined;
  const { debounce } = useDebounce();
  const { theme } = useAppThemeContext();
  const { setCount, setIsLoading, query, search } = usePaginationContext();
  const { valueTabs } = useValueTabs();
  const [data, setData] = useState<iInfrequency[]>();

  const handleChangeYear = (_event: SyntheticEvent, newValue: string) => {
    setSearchParams(valueTabs(newValue, "year"), { replace: true });
  };

  const handleChangePeriod = (_event: SyntheticEvent, newValue: string) => {
    setSearchParams(valueTabs(newValue, "period"), { replace: true });
  };

  const getFrequencies = useCallback((query: string) => {
    setIsLoading(true);
    apiFrequency
      .infrequency(query)
      .then((res) => {
        setData(res.result);
        setCount(res.total);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    let query_data = query(year_id, school_id);
    if (period) query_data += `&category=${period}`;
    if (search) {
      query_data += `&name=${search}`;
      debounce(() => {
        getFrequencies(query_data);
      });
    } else getFrequencies(query_data);
  }, [search, period, year_id, school_id, query]);

  const headCells: iheadCell[] = [
    { numeric: false, label: "Nome" },
    { numeric: false, label: "Período" },
    { numeric: true, label: "Frequências" },
    { numeric: true, label: "Infrequência" },
  ];

  return (
    <Box display="flex" justifyContent="space-between">
      <TabsYear value={year_id} handleChange={handleChangeYear} />
      <Box flex={1}>
        <TabsPeriod value={period} handleChange={handleChangePeriod} />
        <TableBase headCells={headCells}>
          {data?.map((el) => (
            <TableRow key={el.id}>
              <TableCell>{el.name}</TableCell>
              <TableCell>
                {`${dayjs(el.date_initial).utc().format("L")} - ${dayjs(
                  el.date_final
                )
                  .utc()
                  .format("L")}`}
              </TableCell>
              <TableCell align="right">{el.frequencies}</TableCell>
              <TableCell
                align="right"
                sx={{
                  color: "#fff",
                  bgcolor: defineBgColorInfrequency(el.value, theme),
                }}
              >
                {el.value.toFixed(0)}%
              </TableCell>
            </TableRow>
          ))}
        </TableBase>
      </Box>
    </Box>
  );
};
