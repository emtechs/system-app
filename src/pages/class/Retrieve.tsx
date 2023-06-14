import { Navigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  useAuthContext,
  useFrequencyContext,
  useTableContext,
} from "../../shared/contexts";
import { apiUsingNow } from "../../shared/services";
import { iStudentWithSchool, iheadCell } from "../../shared/interfaces";
import { LayoutBasePage } from "../../shared/layouts";
import { TableBase, Tools } from "../../shared/components";
import { TableCell, TableRow, useTheme } from "@mui/material";
import { CardSchoolId } from "../../shared/components/card";
import { defineBgColorInfrequency } from "../../shared/scripts";
import { useDebounce } from "../../shared/hooks";

const headCells: iheadCell[] = [
  { order: "registry", numeric: true, label: "Matrícula" },
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
      <TableCell align="right">{student.registry}</TableCell>
      <TableCell>{student.name}</TableCell>
      <TableCell align="right">{student.presented}</TableCell>
      <TableCell align="right">{student.justified}</TableCell>
      <TableCell align="right">{student.missed}</TableCell>
      <TableCell
        align="right"
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
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const school_id = searchParams.get("school_id");
  const back = searchParams.get("back");
  const { debounce } = useDebounce();
  const { yearData, dashData } = useAuthContext();
  const { isInfreq } = useFrequencyContext();
  const { setIsLoading, defineQuery, setCount } = useTableContext();
  const [data, setData] = useState<iStudentWithSchool[]>();
  const [search, setSearch] = useState<string>();

  useEffect(() => {
    if (yearData && school_id && id) {
      let query = defineQuery(undefined, school_id, id);
      query += "&is_infreq=true";
      if (isInfreq) query += "&infreq=31";
      if (search) {
        query += `&name=${search}`;
        setIsLoading(true);
        debounce(() => {
          apiUsingNow
            .get<{ total: number; result: iStudentWithSchool[] }>(
              `classes/student/${yearData.id}${query}`
            )
            .then((res) => {
              setCount(res.data.total);
              setData(res.data.result);
            })
            .finally(() => setIsLoading(false));
        });
      } else {
        setIsLoading(true);
        apiUsingNow
          .get<{ total: number; result: iStudentWithSchool[] }>(
            `classes/student/${yearData.id}${query}`
          )
          .then((res) => {
            setCount(res.data.total);
            setData(res.data.result);
          })
          .finally(() => setIsLoading(false));
      }
    }
  }, [yearData, id, school_id, isInfreq, defineQuery, search]);

  if (!id && dashData !== "ADMIN") {
    return <Navigate to="/school/class" />;
  }

  return (
    <LayoutBasePage
      school={<CardSchoolId />}
      tools={
        <Tools
          isBack={!!back}
          back={back ? back : undefined}
          isHome
          isNew={dashData === "ADMIN"}
          isFreq
          isSearch
          search={search}
          setSearch={(text) => setSearch(text)}
        />
      }
      title="Listagem de Alunos"
    >
      <TableBase headCells={headCells}>
        {data?.map((student) => (
          <CardStudent key={student.id} student={student} />
        ))}
      </TableBase>
    </LayoutBasePage>
  );
};
