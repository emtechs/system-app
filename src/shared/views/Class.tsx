import { iClassSchoolList, iheadCell } from "../interfaces";
import {
  useAppThemeContext,
  usePaginationContext,
  useSchoolContext,
} from "../contexts";
import { useCallback, useEffect, useState } from "react";
import { apiClass } from "../services";
import { useParams, useSearchParams } from "react-router-dom";
import { useDebounce } from "../hooks";
import { Box, Tab, TableCell, TableRow, Tabs } from "@mui/material";
import { TableBase } from "../components";
import { defineBgColorInfrequency } from "../scripts";

export const ViewClass = () => {
  const [searchParams] = useSearchParams();
  const { school_id } = useParams();
  const year_id = searchParams.get("year_id");
  const { debounce } = useDebounce();
  const { mdDown, theme } = useAppThemeContext();
  const { search, listYear } = useSchoolContext();
  const { setCount, setIsLoading, query } = usePaginationContext();
  const [data, setData] = useState<iClassSchoolList[]>();

  const getClasses = useCallback((query: string) => {
    setIsLoading(true);
    apiClass
      .listSchool(query)
      .then((res) => {
        setData(res.result);
        setCount(res.total);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (year_id && school_id) {
      let query_data = query(year_id, school_id);
      if (search) {
        query_data += `&name=${search}`;
        debounce(() => {
          getClasses(query_data);
        });
      } else getClasses(query_data);
    }
  }, [query, school_id, search, year_id]);

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
        <TableBase headCells={headCells}>
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
      </Box>
    </Box>
  );
};
