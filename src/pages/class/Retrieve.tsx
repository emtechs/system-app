import { Navigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  useAppThemeContext,
  useAuthContext,
  useFrequencyContext,
  usePaginationContext,
} from "../../shared/contexts";
import { apiUsingNow } from "../../shared/services";
import { iStudent, iheadCell } from "../../shared/interfaces";
import { LayoutBasePage } from "../../shared/layouts";
import { TableBase, Tools } from "../../shared/components";
import { TableCell, TableRow } from "@mui/material";
import { useDebounce } from "../../shared/hooks";
import { defineBgColorInfrequency } from "../../shared/scripts";

const headCells: iheadCell[] = [
  { order: "registry", numeric: true, label: "Matrícula" },
  { order: "name", numeric: false, label: "Aluno" },
  { numeric: true, label: "Presenças" },
  { numeric: true, label: "Justificadas" },
  { numeric: true, label: "Faltas" },
  { numeric: true, label: "Frequências" },
  { order: "infreq", numeric: true, label: "Infrequência" },
];

interface iCardStudentProps {
  student: iStudent;
}

const CardStudent = ({ student }: iCardStudentProps) => {
  const { theme } = useAppThemeContext();
  return (
    <TableRow>
      <TableCell align="right">{student.registry}</TableCell>
      <TableCell>{student.name}</TableCell>
      <TableCell align="right">{student.frequencies.presented}</TableCell>
      <TableCell align="right">{student.frequencies.justified}</TableCell>
      <TableCell align="right">{student.frequencies.missed}</TableCell>
      <TableCell align="right">{student.frequencies.total}</TableCell>
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
  const { setIsLoading, query, setCount } = usePaginationContext();
  const [data, setData] = useState<iStudent[]>();
  const [search, setSearch] = useState<string>();

  useEffect(() => {
    if (yearData && school_id && id) {
      let query_data = query(undefined, school_id, id);
      query_data += "&is_infreq=true";
      if (isInfreq) query_data += "&infreq=31";
      if (search) {
        query_data += `&name=${search}`;
        setIsLoading(true);
        debounce(() => {
          apiUsingNow
            .get<{ total: number; result: iStudent[] }>(
              `classes/student/${yearData.id}${query_data}`
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
          .get<{ total: number; result: iStudent[] }>(
            `classes/student/${yearData.id}${query}`
          )
          .then((res) => {
            setCount(res.data.total);
            setData(res.data.result);
          })
          .finally(() => setIsLoading(false));
      }
    }
  }, [yearData, id, school_id, isInfreq, query, search]);

  if (!id && dashData !== "ADMIN") {
    return <Navigate to="/school/class" />;
  }

  return (
    <LayoutBasePage
      tools={
        <Tools
          back={back ? back : undefined}
          isHome
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
