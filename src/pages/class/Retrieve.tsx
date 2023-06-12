import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFrequencyContext, useTableContext } from "../../shared/contexts";
import { apiUsingNow } from "../../shared/services";
import {
  iClassWithSchool,
  iStudentWithSchool,
  iheadCell,
} from "../../shared/interfaces";
import { LayoutBasePage } from "../../shared/layouts";
import { TableBase, Tools } from "../../shared/components";
import { TableCell, TableRow, useTheme } from "@mui/material";
import { CardSchoolId } from "../../shared/components/card";
import { defineBgColorInfrequency } from "../../shared/scripts";

const headCells: iheadCell[] = [
  { numeric: true, label: "Matrícula" },
  { order: "name", numeric: false, label: "Aluno" },
  { numeric: true, label: "Presenças" },
  { numeric: true, label: "Justificadas" },
  { numeric: true, label: "Faltas" },
  { order: "infreq", numeric: true, label: "Infrequência" },
];

interface iCardStudentProps {
  student: iStudentWithSchool;
}

const CardStudent = ({ student }: iCardStudentProps) => {
  const theme = useTheme();
  return (
    <TableRow>
      <TableCell>{student.registry}</TableCell>
      <TableCell>{student.name}</TableCell>
      <TableCell>{student.presented}</TableCell>
      <TableCell>{student.justified}</TableCell>
      <TableCell>{student.missed}</TableCell>
      <TableCell
        sx={{
          color: "#fff",
          bgcolor: defineBgColorInfrequency(student.infrequency, theme),
        }}
      >
        {String(student.infrequency).replace(".", ",")}%
      </TableCell>
    </TableRow>
  );
};

export const RetrieveClassPage = () => {
  const { class_id, school_id, year_id } = useParams();
  const [searchParams] = useSearchParams();
  const classBack = searchParams.get("class");
  const { isInfreq } = useFrequencyContext();
  const { setIsLoading } = useTableContext();
  const [data, setData] = useState<iClassWithSchool>();

  useEffect(() => {
    setIsLoading(true);
    const query = isInfreq ? "?is_infreq=true" : "";
    apiUsingNow
      .get<iClassWithSchool>(
        `classes/${class_id}/${school_id}/${year_id}${query}`
      )
      .then((res) => setData(res.data))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const query = isInfreq ? "?is_infreq=true" : "";
    apiUsingNow
      .get<iClassWithSchool>(
        `classes/${class_id}/${school_id}/${year_id}${query}`
      )
      .then((res) => setData(res.data))
      .finally(() => setIsLoading(false));
  }, [isInfreq]);

  return (
    <LayoutBasePage
      school={<CardSchoolId />}
      tools={
        <Tools
          back={
            classBack
              ? "/class/list"
              : `/class/list/${data?.school.id}/${data?.year.id}`
          }
          isHome
          isFreq
        />
      }
      title={data ? data.class.name : "Listagem de Alunos de uma Classe"}
    >
      <TableBase headCells={headCells}>
        {data?.students.map((student) => (
          <CardStudent key={student.id} student={student} />
        ))}
      </TableBase>
    </LayoutBasePage>
  );
};
