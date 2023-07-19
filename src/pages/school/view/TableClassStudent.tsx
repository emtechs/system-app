import { useMemo, useState } from "react";
import { iHeadcell, iStudent } from "../../../shared/interfaces";
import {
  DialogRemoveStudent,
  DialogTransferStudent,
  TableBase,
} from "../../../shared/components";
import { TableCell, TableRow } from "@mui/material";
import { ActionsStudent } from "../../../shared/views/tables/actions";

interface iTableStudentSchoolProps {
  data: iStudent[];
}

export const TableStudentSchoolClass = ({ data }: iTableStudentSchoolProps) => {
  const [studentData, setStudentData] = useState<iStudent>();

  const handleStudent = (newStudent: iStudent) => setStudentData(newStudent);

  const headCells: iHeadcell[] = useMemo(() => {
    return [
      { order: "registry", numeric: "right", label: "Matrícula" },
      { order: "name", numeric: "left", label: "Aluno" },
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
            <ActionsStudent student={el} handleStudent={handleStudent} />
          </TableRow>
        ))}
      </TableBase>
      {studentData && <DialogRemoveStudent student={studentData} />}
      {studentData && <DialogTransferStudent student={studentData} />}
    </>
  );
};
