import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppThemeContext } from "../../shared/contexts";
import { apiUsingNow } from "../../shared/services";
import { iClassWithSchool, iStudentWithSchool } from "../../shared/interfaces";
import { LayoutBasePage } from "../../shared/layouts";
import { TableRetrieveClass } from "../../shared/components";
import { TableCell, TableRow } from "@mui/material";
import { CardSchool } from "../../shared/components/card";

interface iCardStudentProps {
  student: iStudentWithSchool;
}

const CardStudent = ({ student }: iCardStudentProps) => {
  return (
    <TableRow>
      <TableCell>{student.registry}</TableCell>
      <TableCell>{student.name}</TableCell>
      <TableCell>{student.presented}</TableCell>
      <TableCell>{student.justified}</TableCell>
      <TableCell>{student.missed}</TableCell>
      <TableCell>{String(student.infrequency).replace(".", ",")}%</TableCell>
    </TableRow>
  );
};

export const RetrieveClass = () => {
  const { class_id, school_id, school_year_id } = useParams();
  const { setLoading } = useAppThemeContext();
  const [data, setData] = useState<iClassWithSchool>();
  useEffect(() => {
    setLoading(true);
    apiUsingNow
      .get<iClassWithSchool>(
        `classes/${class_id}/${school_id}/${school_year_id}`
      )
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <LayoutBasePage
      school={<CardSchool />}
      title={data ? data.class.name : "Listagem de Alunos de uma Classe"}
    >
      <TableRetrieveClass>
        <>
          {data?.students.map((student) => (
            <CardStudent key={student.id} student={student} />
          ))}
        </>
      </TableRetrieveClass>
    </LayoutBasePage>
  );
};
