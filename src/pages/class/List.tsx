import { iClassSchoolList, iheadCell } from "../../shared/interfaces";
import {
  useAuthContext,
  useFrequencyContext,
  usePaginationContext,
} from "../../shared/contexts";
import { useEffect, useState } from "react";
import { apiClass } from "../../shared/services";
import { useNavigate } from "react-router-dom";
import { LayoutBasePage } from "../../shared/layouts";
import { TableBase, Tools } from "../../shared/components";
import { TableCell, TableRow, useTheme } from "@mui/material";
import { defineBgColorInfrequency } from "../../shared/scripts";
import { useDebounce } from "../../shared/hooks";

const headCells: iheadCell[] = [
  { order: "name", numeric: false, label: "Turma" },
  { order: "school_name", numeric: false, label: "Escola" },
  { numeric: true, label: "Alunos" },
  { numeric: true, label: "Frequências" },
  { order: "infreq", numeric: true, label: "Infrequência" },
];

interface iCardClassProps {
  el: iClassSchoolList;
}
const CardClass = ({ el }: iCardClassProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <TableRow
      hover
      sx={{ cursor: "pointer" }}
      onClick={() =>
        navigate(
          `/class?id=${el.class.id}&school_id=${el.school.id}&class=true`
        )
      }
    >
      <TableCell>{el.class.name}</TableCell>
      <TableCell>{el.school.name}</TableCell>
      <TableCell>{el._count.students}</TableCell>
      <TableCell>{el._count.frequencies}</TableCell>
      <TableCell
        sx={{
          color: "#fff",
          bgcolor: defineBgColorInfrequency(el.infreq, theme),
        }}
      >
        {String(el.infreq).replace(".", ",")}%
      </TableCell>
    </TableRow>
  );
};

export const ListClassPage = () => {
  const { debounce } = useDebounce();
  const { yearData } = useAuthContext();
  const { isInfreq } = useFrequencyContext();
  const { setCount, setIsLoading, defineQuery } = usePaginationContext();
  const [data, setData] = useState<iClassSchoolList[]>();
  const [search, setSearch] = useState<string>();

  useEffect(() => {
    if (yearData) {
      let query = defineQuery(yearData.id);
      query += "&is_active=true";
      if (isInfreq) query += "&infreq=31";
      if (search) {
        query += `&name=${search}`;
        setIsLoading(true);
        debounce(() => {
          apiClass
            .listSchool(yearData.id, query)
            .then((res) => {
              setData(res.result);
              setCount(res.total);
            })
            .finally(() => setIsLoading(false));
        });
      } else {
        setIsLoading(true);
        apiClass
          .listSchool(yearData.id, query)
          .then((res) => {
            setData(res.result);
            setCount(res.total);
          })
          .finally(() => setIsLoading(false));
      }
    }
  }, [isInfreq, yearData, defineQuery, search]);

  return (
    <LayoutBasePage
      title={"Listagem de Turmas"}
      tools={
        <Tools
          isHome
          isFreq
          isSearch
          search={search}
          setSearch={(text) => setSearch(text)}
        />
      }
    >
      <TableBase headCells={headCells}>
        {data?.map((el, index) => (
          <CardClass key={index} el={el} />
        ))}
      </TableBase>
    </LayoutBasePage>
  );
};
