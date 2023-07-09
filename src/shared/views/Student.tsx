import { useParams, useSearchParams } from "react-router-dom";
import { useDebounce } from "../hooks";
import {
  useAppThemeContext,
  usePaginationContext,
  useSchoolContext,
} from "../contexts";
import { useCallback, useEffect, useState } from "react";
import { iStudent, iheadCell } from "../interfaces";
import { apiStudent } from "../services";
import { Box, Tab, TableCell, TableRow, Tabs } from "@mui/material";
import { TableBase } from "../components";
import { defineBgColorInfrequency } from "../scripts";

export const ViewStudent = () => {
  const [searchParams] = useSearchParams();
  const { school_id } = useParams();
  const year_id = searchParams.get("year_id");
  const { debounce } = useDebounce();
  const { mdDown, theme } = useAppThemeContext();
  const { search, listYear } = useSchoolContext();
  const { setCount, setIsLoading, query } = usePaginationContext();
  const [data, setData] = useState<iStudent[]>();

  const getStudents = useCallback((query: string) => {
    setIsLoading(true);
    apiStudent
      .list(query)
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
          getStudents(query_data);
        });
      } else getStudents(query_data);
    }
  }, [query, school_id, search, year_id]);

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
        <TableBase headCells={headCells}>
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
      </Box>
    </Box>
  );
};
