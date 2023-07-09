import { useParams, useSearchParams } from "react-router-dom";
import { useDebounce } from "../hooks";
import {
  useAppThemeContext,
  usePaginationContext,
  useSchoolContext,
} from "../contexts";
import { useCallback, useEffect, useMemo, useState } from "react";
import { iInfrequency, iheadCell } from "../interfaces";
import { apiFrequency } from "../services";
import { Box, Tab, TableCell, TableRow, Tabs } from "@mui/material";
import { TableBase } from "../components";
import { defineBgColorInfrequency } from "../scripts";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import utc from "dayjs/plugin/utc";
dayjs.locale("pt-br");
dayjs.extend(utc);

export const ViewInfrequency = () => {
  const [searchParams] = useSearchParams();
  const { school_id } = useParams();
  const year_id = searchParams.get("year_id");
  const period = searchParams.get("period");
  const { debounce } = useDebounce();
  const { theme } = useAppThemeContext();
  const { search, listYear, periods } = useSchoolContext();
  const { setCount, setIsLoading, query } = usePaginationContext();
  const [data, setData] = useState<iInfrequency[]>();

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
    if (year_id && school_id) {
      let query_data = query(year_id, school_id);
      if (period) query_data += `&category=${period}`;
      if (search) {
        query_data += `&name=${search}`;
        debounce(() => {
          getFrequencies(query_data);
        });
      } else getFrequencies(query_data);
    }
  }, [search, period, year_id, school_id, query]);

  const headCells: iheadCell[] = [
    { numeric: false, label: "Nome" },
    { numeric: false, label: "Período" },
    { numeric: true, label: "Frequências" },
    { numeric: true, label: "Infrequência" },
  ];

  const href = useMemo(() => {
    return `/school/${school_id}?view=infrequency&year_id=`;
  }, [school_id]);

  return (
    <Box display="flex" justifyContent="space-between">
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={year_id}
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        {listYear?.map((el) => (
          <Tab
            key={el.id}
            label={el.year}
            href={href + `${el.id}&period=${period}`}
            value={el.id}
          />
        ))}
      </Tabs>
      <Box flex={1}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={period} variant="scrollable" scrollButtons="auto">
            {periods?.map((el) => (
              <Tab
                key={el.id}
                label={el.label}
                href={href + `${year_id}&period=${el.id}`}
                value={el.id}
              />
            ))}
          </Tabs>
        </Box>
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
