import { useNavigate } from "react-router-dom";
import { useAppThemeContext } from "../../../../shared/contexts";
import { iClassSchoolList, iheadCell } from "../../../../shared/interfaces";
import { TableCell, TableRow } from "@mui/material";
import { TableBase } from "../../../../shared/components";

interface iTableClassProps {
  data: iClassSchoolList[];
}

export const TableClass = ({ data }: iTableClassProps) => {
  const { mdDown, defineBgColorInfrequency } = useAppThemeContext();
  const navigate = useNavigate();

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
    <TableBase headCells={headCells}>
      {data.map((el, index) => (
        <TableRow
          key={index}
          hover
          sx={{ cursor: "pointer" }}
          onClick={() => {
            navigate(
              `/school/student?class_id=${el.class.id}&back=/school/class`
            );
          }}
        >
          <TableCell>{el.class.name}</TableCell>
          {!mdDown && (
            <>
              <TableCell align="right">{el._count.students}</TableCell>
              <TableCell align="right">{el._count.frequencies}</TableCell>
            </>
          )}
          <TableCell
            align="right"
            sx={{
              color: "#fff",
              bgcolor: defineBgColorInfrequency(el.infrequency),
            }}
          >
            {String(el.infrequency).replace(".", ",")}%
          </TableCell>
        </TableRow>
      ))}
    </TableBase>
  );
};
