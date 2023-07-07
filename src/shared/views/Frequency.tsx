import { useParams, useSearchParams } from "react-router-dom";
import { useDebounce } from "../hooks";
import {
  useAppThemeContext,
  usePaginationContext,
  useSchoolContext,
} from "../contexts";
import { useCallback, useEffect, useState } from "react";
import { iFrequencyBase, iheadCell } from "../interfaces";
import { apiFrequency } from "../services";
import { Box, Tab, TableCell, TableRow, Tabs } from "@mui/material";
import { PaginationMobile, TableBase } from "../components";
import { defineBgColorInfrequency } from "../scripts";

export const ViewFrequency = () => {
  const [searchParams] = useSearchParams();
  const { school_id } = useParams();
  const year_id = searchParams.get("year_id");
  const { debounce } = useDebounce();
  const { mdDown, theme } = useAppThemeContext();
  const { search, listYear } = useSchoolContext();
  const { setCount, setIsLoading, defineQuery, define_step, query } =
    usePaginationContext();
  const [data, setData] = useState<iFrequencyBase[]>();

  const getFrequencies = useCallback(
    (query: string, take: number) => {
      if (mdDown) {
        setIsLoading(true);
        apiFrequency
          .list(query)
          .then((res) => {
            setData(res.result);
            setCount(res.total);
            define_step(res.total, take);
          })
          .finally(() => setIsLoading(false));
      } else {
        setIsLoading(true);
        apiFrequency
          .list(query)
          .then((res) => {
            setData(res.result);
            setCount(res.total);
          })
          .finally(() => setIsLoading(false));
      }
    },
    [mdDown]
  );

  const queryData = useCallback(
    (take: number) => {
      if (year_id && school_id) {
        let query_data = defineQuery(year_id, school_id);
        if (mdDown) {
          query_data = query(take, year_id, school_id);
          return query_data;
        }
        return query_data;
      }
      return "";
    },
    [defineQuery, query, mdDown, year_id, school_id]
  );

  useEffect(() => {
    const take = 5;
    let query = queryData(take);
    if (search) {
      query += `&name=${search}`;
      debounce(() => {
        getFrequencies(query, take);
      });
    } else getFrequencies(query, take);
  }, [queryData, search]);

  const headCells: iheadCell[] = [
    { order: "date", numeric: false, label: "Data" },
    { order: "name", numeric: false, label: "Turma" },
    { numeric: true, label: "Alunos" },
    { order: "infreq", numeric: true, label: "Infrequência" },
  ];

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
            href={"/school/" + school_id + "?view=frequency&year_id=" + el.id}
            value={el.id}
          />
        ))}
      </Tabs>
      <Box flex={1}>
        <TableBase
          headCells={headCells}
          is_pagination={mdDown ? false : undefined}
        >
          {data?.map((el) => (
            <TableRow key={el.id}>
              <TableCell>{el.date}</TableCell>
              <TableCell>{el.class.name}</TableCell>
              <TableCell align="right">{el.total_students}</TableCell>
              <TableCell
                align="right"
                sx={{
                  color: "#fff",
                  bgcolor: defineBgColorInfrequency(el.infrequency, theme),
                }}
              >
                {el.infrequency.toFixed(0)}%
              </TableCell>
            </TableRow>
          ))}
        </TableBase>
        {mdDown && <PaginationMobile />}
      </Box>
    </Box>
  );
};
