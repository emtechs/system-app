import { useMemo, useState } from "react";
import { iStudent, iHeadcell } from "../../../interfaces";
import { useAppThemeContext } from "../../../contexts";
import { DialogRemoveStudent, TableBase } from "../../../components";
import { TableCell, TableRow } from "@mui/material";
import { defineBgColorInfrequency } from "../../../scripts";
import { ActionsStudent } from "../actions";

interface iTableStudentSchoolProps {
  data: iStudent[];
}

export const TableStudentSchoolClass = ({ data }: iTableStudentSchoolProps) => {
  const { theme } = useAppThemeContext();
  const [studentData, setStudentData] = useState<iStudent>();

  const handleStudent = (newStudent: iStudent) => setStudentData(newStudent);

  const headCells: iHeadcell[] = useMemo(() => {
    return [
      { order: "registry", numeric: "right", label: "Matrícula" },
      { order: "name", numeric: "left", label: "Aluno" },
      { order: "infrequency", numeric: "right", label: "Infrequência" },
      { numeric: "left", label: "Ações" },
    ];
  }, []);

  return (
    <>
      <TableBase headCells={headCells}>
        {data.map((el) => (
          <TableRow key={el.id}>
            <TableCell align="right">{el.registry}</TableCell>
            <TableCell>{el.name}</TableCell>
            <TableCell
              align="right"
              sx={{
                color: "#fff",
                bgcolor: defineBgColorInfrequency(el.infrequency, theme),
              }}
            >
              {el.infrequency > 0 ? el.infrequency.toFixed(0) : 0}%
            </TableCell>
            <ActionsStudent student={el} handleStudent={handleStudent} />
          </TableRow>
        ))}
      </TableBase>
      {studentData && <DialogRemoveStudent student={studentData} />}
    </>
  );
};
