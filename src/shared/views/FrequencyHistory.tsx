import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../hooks";
import { usePaginationContext, useUserContext } from "../contexts";
import { useCallback, useEffect, useState } from "react";
import { iFrequencyHistory, iheadCell } from "../interfaces";
import { apiFrequency } from "../services";
import { Box, Tab, TableCell, TableRow, Tabs } from "@mui/material";
import { TableBase } from "../components";
import { statusFrequencyPtBr } from "../scripts";

export const ViewFrequencyHistory = () => {
  const [searchParams] = useSearchParams();
  const year_id = searchParams.get("year_id");
  const { debounce } = useDebounce();
  const { search, userRetrieve, listYear } = useUserContext();
  const { setCount, setIsLoading, query } = usePaginationContext();
  const [data, setData] = useState<iFrequencyHistory[]>();

  const getFrequencies = useCallback(
    (query: string) => {
      setIsLoading(true);
      apiFrequency
        .history(query)
        .then((res) => {
          setData(res.result);
          setCount(res.total);
        })
        .finally(() => setIsLoading(false));
    },
    [setCount, setIsLoading]
  );

  useEffect(() => {
    if (year_id) {
      let query_data = query(year_id);
      if (userRetrieve) query_data += `&user_id=${userRetrieve.id}`;
      if (search) {
        query_data += `&name=${search}`;
        debounce(() => {
          getFrequencies(query_data);
        });
      } else getFrequencies(query_data);
    }
  }, [debounce, query, getFrequencies, search, userRetrieve, year_id]);

  const headCells: iheadCell[] = [
    { numeric: false, label: "Data" },
    { numeric: false, label: "Matrícula" },
    { numeric: false, label: "Aluno" },
    { numeric: false, label: "Turma" },
    { numeric: false, label: "Presença" },
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
            href={
              "/user/" + userRetrieve?.id + "?view=history&year_id=" + el.id
            }
            value={el.id}
          />
        ))}
      </Tabs>
      <Box flex={1}>
        <TableBase headCells={headCells}>
          {data?.map((el) => (
            <TableRow key={el.id}>
              <TableCell>{el.date}</TableCell>
              <TableCell>{el.student.registry}</TableCell>
              <TableCell>{el.student.name}</TableCell>
              <TableCell>{el.class.name}</TableCell>
              <TableCell>{statusFrequencyPtBr(el.status_student)}</TableCell>
            </TableRow>
          ))}
        </TableBase>
      </Box>
    </Box>
  );
};
