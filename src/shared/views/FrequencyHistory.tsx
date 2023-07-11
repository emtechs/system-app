import { useSearchParams } from "react-router-dom";
import { useDebounce, useValueTabs } from "../hooks";
import { usePaginationContext, useUserContext } from "../contexts";
import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { iFrequencyHistory, iheadCell } from "../interfaces";
import { apiFrequency } from "../services";
import { Box, TableCell, TableRow } from "@mui/material";
import { TableBase, TabsYear } from "../components";
import { statusFrequencyPtBr } from "../scripts";

export const ViewFrequencyHistory = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const year_id = searchParams.get("year_id") || undefined;
  const { debounce } = useDebounce();
  const { userRetrieve } = useUserContext();
  const { setCount, setIsLoading, query, search } = usePaginationContext();
  const { valueTabs } = useValueTabs();
  const [data, setData] = useState<iFrequencyHistory[]>();

  const handleChange = (_event: SyntheticEvent, newValue: string) => {
    setSearchParams(valueTabs(newValue, "year"), { replace: true });
  };

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
      <TabsYear value={year_id} handleChange={handleChange} />
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
