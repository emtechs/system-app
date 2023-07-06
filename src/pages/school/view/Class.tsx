import { iClassSchoolList, iheadCell } from "../../../shared/interfaces";
import {
  useAppThemeContext,
  usePaginationContext,
  useSchoolContext,
} from "../../../shared/contexts";
import { useCallback, useEffect, useState } from "react";
import { apiClass } from "../../../shared/services";
import { useParams, useSearchParams } from "react-router-dom";
import { useDebounce } from "../../../shared/hooks";
import { Box, Tab, TableCell, TableRow, Tabs } from "@mui/material";
import { PaginationMobile, TableBase } from "../../../shared/components";
import { defineBgColorInfrequency } from "../../../shared/scripts";

export const ViewSchoolClass = () => {
  const [searchParams] = useSearchParams();
  const { school_id } = useParams();
  const year_id = searchParams.get("year_id");
  const { debounce } = useDebounce();
  const { mdDown, theme } = useAppThemeContext();
  const { search, listYear } = useSchoolContext();
  const { setCount, setIsLoading, defineQuery, define_step, query } =
    usePaginationContext();
  const [data, setData] = useState<iClassSchoolList[]>();

  const getClasses = useCallback(
    (school_id_data: string, query: string, take: number) => {
      if (mdDown) {
        setIsLoading(true);
        apiClass
          .listWithSchool(school_id_data, query)
          .then((res) => {
            setData(res.result);
            setCount(res.total);
            define_step(res.total, take);
          })
          .finally(() => setIsLoading(false));
      } else {
        setIsLoading(true);
        apiClass
          .listWithSchool(school_id_data, query)
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
      if (year_id) {
        let query_data = defineQuery(year_id);
        if (mdDown) {
          query_data = query(take, year_id);
          return query_data;
        }
        return query_data;
      }
      return "";
    },
    [defineQuery, query, mdDown, year_id]
  );

  useEffect(() => {
    if (school_id) {
      const take = 5;
      let query = queryData(take);
      if (search) {
        query += `&name=${search}`;
        debounce(() => {
          getClasses(school_id, query, take);
        });
      } else getClasses(school_id, query, take);
    }
  }, [queryData, search, school_id]);

  const headCells: iheadCell[] = mdDown
    ? [
        { order: "name", numeric: false, label: "Turma" },
        { numeric: true, label: "Infrequência" },
      ]
    : [
        { order: "name", numeric: false, label: "Turma" },
        { numeric: true, label: "Alunos" },
        { numeric: true, label: "Frequências" },
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
            href={"/school/" + school_id + "?view=class&year_id=" + el.id}
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
              <TableCell>{el.name}</TableCell>
              {!mdDown && (
                <>
                  <TableCell align="right">{el.students}</TableCell>
                  <TableCell align="right">{el.frequencies}</TableCell>
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
