import { iClassSchoolList, iheadCell } from "../../../shared/interfaces";
import {
  useAppThemeContext,
  useFrequencyContext,
  usePaginationContext,
  useSchoolContext,
} from "../../../shared/contexts";
import { useEffect, useState } from "react";
import { apiClass } from "../../../shared/services";
import { useParams } from "react-router-dom";
import { useDebounce } from "../../../shared/hooks";
import { Box, TableCell, TableRow } from "@mui/material";
import { PaginationMobile, TableBase } from "../../../shared/components";
import { defineBgColorInfrequency } from "../../../shared/scripts";

export const ViewSchoolClass = () => {
  const { school_id, year_id } = useParams();
  const { debounce } = useDebounce();
  const { mdDown, theme } = useAppThemeContext();
  const { search } = useSchoolContext();
  const { isInfreq } = useFrequencyContext();
  const { setCount, setIsLoading, defineQuery } = usePaginationContext();
  const [data, setData] = useState<iClassSchoolList[]>();

  useEffect(() => {
    if (school_id && year_id) {
      let query = defineQuery(undefined, school_id) + "&is_active=true";
      if (isInfreq) query += "&infreq=31";
      if (search) {
        query += `&name=${search}`;
        setIsLoading(true);
        debounce(() => {
          apiClass
            .listSchool(year_id, query)
            .then((res) => {
              setData(res.result);
              setCount(res.total);
            })
            .finally(() => setIsLoading(false));
        });
      } else {
        setIsLoading(true);
        apiClass
          .listSchool(year_id, query)
          .then((res) => {
            setData(res.result);
            setCount(res.total);
          })
          .finally(() => setIsLoading(false));
      }
    }
  }, [school_id, year_id, isInfreq, defineQuery, search]);

  const headCells: iheadCell[] = mdDown
    ? [
        { order: "name", numeric: false, label: "Turma" },
        { order: "infreq", numeric: true, label: "Infrequência" },
      ]
    : [
        { order: "name", numeric: false, label: "Turma" },
        { numeric: true, label: "Alunos" },
        { numeric: true, label: "Frequências" },
        { order: "infreq", numeric: true, label: "Infrequência" },
      ];

  return (
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
  );
};
