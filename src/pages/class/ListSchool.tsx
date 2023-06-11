import { iClassWithSchool, iheadCell } from "../../shared/interfaces";
import { useTableContext } from "../../shared/contexts";
import { useEffect, useState } from "react";
import { apiUsingNow } from "../../shared/services";
import { useNavigate, useParams } from "react-router-dom";
import { LayoutBasePage } from "../../shared/layouts";
import { TableBase, Tools } from "../../shared/components";
import { TableCell, TableRow, useTheme } from "@mui/material";
import { CardSchoolId } from "../../shared/components/card";
import { defineBgColorInfrequency } from "../../shared/scripts";

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
  const { school_id, year_id } = useParams();
  const { setCount, take, skip, setIsLoading } = useTableContext();
  const [data, setData] = useState<iClassWithSchool[]>();

  useEffect(() => {
    let query = `?year_id=${year_id}&is_active=true`;
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
    <LayoutBasePage
      title={"Listagem de Turmas"}
      school={<CardSchoolId school_id={school_id ? school_id : ""} />}
      tools={<Tools isHome back={`/school/${school_id}`} />}
    >
      <TableBase headCells={headCells}>
        {data?.map((el) => (
          <CardClass key={el.class.id} el={el} />
        ))}
      </TableBase>
    </LayoutBasePage>
  );
};
