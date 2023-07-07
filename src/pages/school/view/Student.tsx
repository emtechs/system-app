import { useParams, useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import {
  useAppThemeContext,
  usePaginationContext,
  useSchoolContext,
} from "../../../shared/contexts";
import { apiStudent } from "../../../shared/services";
import { iStudent, iheadCell } from "../../../shared/interfaces";
import { PaginationMobile, TableBase } from "../../../shared/components";
import { Box, Tab, TableCell, TableRow, Tabs } from "@mui/material";
import { useDebounce } from "../../../shared/hooks";
import { defineBgColorInfrequency } from "../../../shared/scripts";

export const ViewSchoolStudent = () => {
  const [searchParams] = useSearchParams();
  const { school_id } = useParams();
  const year_id = searchParams.get("year_id");
  const { debounce } = useDebounce();
  const { mdDown, theme } = useAppThemeContext();
  const { search, listYear } = useSchoolContext();
  const { setCount, setIsLoading, defineQuery, define_step, query } =
    usePaginationContext();
  const [data, setData] = useState<iStudent[]>();

  const getStudents = useCallback(
    (query: string, take: number) => {
      if (mdDown) {
        setIsLoading(true);
        apiStudent
          .list(query)
          .then((res) => {
            setData(res.result);
            setCount(res.total);
            define_step(res.total, take);
          })
          .finally(() => setIsLoading(false));
      } else {
        setIsLoading(true);
        apiStudent
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
        getStudents(query, take);
      });
    } else getStudents(query, take);
  }, [queryData, search]);

  const headCells: iheadCell[] = mdDown
    ? [
        { order: "registry", numeric: true, label: "Matrícula" },
        { order: "name", numeric: false, label: "Aluno" },
        { numeric: true, label: "Infrequência" },
      ]
    : [
        { order: "registry", numeric: true, label: "Matrícula" },
        { order: "name", numeric: false, label: "Aluno" },
        { numeric: false, label: "Turma" },
        { numeric: true, label: "Infrequência" },
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
            href={"/school/" + school_id + "?view=student&year_id=" + el.id}
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
              <TableCell align="right">{el.registry}</TableCell>
              <TableCell>{el.name}</TableCell>
              {!mdDown && (
                <>
                  <TableCell>{el.class.name}</TableCell>
                </>
              )}
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
