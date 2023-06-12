import { iClassWithSchool, iheadCell } from "../../shared/interfaces";
import {
  useAuthContext,
  useSchoolContext,
  useTableContext,
} from "../../shared/contexts";
import { useEffect, useState } from "react";
import { apiUsingNow } from "../../shared/services";
import { useNavigate, useSearchParams } from "react-router-dom";
import { TableBase } from "../../shared/components";
import { TableCell, TableRow, useTheme } from "@mui/material";
import { defineBgColorInfrequency } from "../../shared/scripts";
import { LayoutSchoolPage } from "./Layout";

const headCells: iheadCell[] = [
  { order: "name", numeric: false, label: "Turma" },
  { numeric: true, label: "Alunos" },
  { numeric: true, label: "Frequências" },
  { order: "infreq", numeric: true, label: "Infrequência" },
];

interface iCardClassProps {
  el: iClassWithSchool;
}
const CardClass = ({ el }: iCardClassProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <TableRow
      hover
      sx={{ cursor: "pointer" }}
      onClick={() =>
        navigate(`/class/${el.class.id}/${el.school.id}/${el.year.id}`)
      }
    >
      <TableCell>{el.class.name}</TableCell>
      <TableCell>{el._count.students}</TableCell>
      <TableCell>{el._count.frequencies}</TableCell>
      <TableCell
        sx={{
          color: "#fff",
          bgcolor: defineBgColorInfrequency(el.infrequency, theme),
        }}
      >
        {String(el.infrequency).replace(".", ",")}%
      </TableCell>
    </TableRow>
  );
};

export const ListClassSchoolPage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { yearId } = useAuthContext();
  const { schoolSelect } = useSchoolContext();
  const { setCount, take, skip, setIsLoading } = useTableContext();
  const [data, setData] = useState<iClassWithSchool[]>();
  let school_id = "";
  if (id) {
    school_id = id;
  } else if (schoolSelect) school_id = schoolSelect.id;

  useEffect(() => {
    let query = `?year_id=${yearId}&is_active=true`;
    if (take) query += `&take=${take}`;
    if (skip) query += `&skip=${skip}`;
    setIsLoading(true);
    apiUsingNow
      .get<{ total: number; result: iClassWithSchool[] }>(
        `classes/school/${school_id}${query}`
      )
      .then((res) => {
        setData(res.data.result);
        setCount(res.data.total);
      })
      .finally(() => setIsLoading(false));
  }, [take, skip]);

  return (
    <LayoutSchoolPage title="Listagem de Turmas" isSchool>
      <TableBase headCells={headCells}>
        {data?.map((el) => (
          <CardClass key={el.class.id} el={el} />
        ))}
      </TableBase>
    </LayoutSchoolPage>
  );
};
