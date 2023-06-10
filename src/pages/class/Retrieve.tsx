import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppThemeContext, useFrequencyContext } from "../../shared/contexts";
import { apiUsingNow } from "../../shared/services";
import { iClassWithSchool, iStudentWithSchool } from "../../shared/interfaces";
import { LayoutBasePage } from "../../shared/layouts";
import { TableRetrieveClass, Tools } from "../../shared/components";
import { TableCell, TableRow, useTheme } from "@mui/material";
import { CardSchoolId } from "../../shared/components/card";
import { defineBgColorInfrequency } from "../../shared/scripts";

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
  const { setLoading } = useAppThemeContext();
  const { isInfreq } = useFrequencyContext();
  const [data, setData] = useState<iClassWithSchool>();

  useEffect(() => {
    setLoading(true);
    const query = isInfreq ? "?is_infreq=true" : "";
    apiUsingNow
      .get<iClassWithSchool>(
        `classes/${class_id}/${school_id}/${year_id}${query}`
      )
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setLoading(true);
    const query = isInfreq ? "?is_infreq=true" : "";
    apiUsingNow
      .get<iClassWithSchool>(
        `classes/${class_id}/${school_id}/${year_id}${query}`
      )
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, [isInfreq]);

  return (
    <LayoutBasePage
      school={<CardSchoolId school_id={school_id ? school_id : ""} />}
      tools={
        <Tools
          isBack
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
