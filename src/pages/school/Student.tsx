import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  useAppThemeContext,
  useAuthContext,
  useFrequencyContext,
  usePaginationContext,
} from "../../shared/contexts";
import { apiUsingNow } from "../../shared/services";
import { iStudentWithSchool, iheadCell } from "../../shared/interfaces";
import { TableBase, Tools } from "../../shared/components";
import { Chip, TableCell, TableRow } from "@mui/material";
import { useDebounce } from "../../shared/hooks";
import { Group } from "@mui/icons-material";
import { LayoutBasePage } from "../../shared/layouts";
import { defineBgColorInfrequency } from "../../shared/scripts";

interface iCardStudentProps {
  student: iStudentWithSchool;
}

const CardStudent = ({ student }: iCardStudentProps) => {
  const navigate = useNavigate();
  const { mdDown, theme } = useAppThemeContext();
  return (
    <TableRow
      hover
      onClick={() => navigate(`/frequency/student?id=${student.id}`)}
      sx={{ cursor: "pointer" }}
    >
      <TableCell align="right">{student.registry}</TableCell>
      <TableCell>{student.name}</TableCell>
      {!mdDown && (
        <>
          <TableCell align="right">{student.presented}</TableCell>
          <TableCell align="right">{student.justified}</TableCell>
          <TableCell align="right">{student.missed}</TableCell>
          <TableCell align="right">{student.total_frequencies}</TableCell>
        </>
      )}
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

export const ListStundetSchoolPage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const class_id = searchParams.get("class_id");
  const back = searchParams.get("back");
  const { debounce } = useDebounce();
  const { mdDown } = useAppThemeContext();
  const { yearData, dashData, schoolData } = useAuthContext();
  const { isInfreq } = useFrequencyContext();
  const { setIsLoading, defineQuery, setCount } = usePaginationContext();
  const [data, setData] = useState<iStudentWithSchool[]>();
  const [search, setSearch] = useState<string>();

  const headCells: iheadCell[] = mdDown
    ? [
        { order: "registry", numeric: true, label: "Matrícula" },
        { order: "name", numeric: false, label: "Aluno" },
        { order: "infreq", numeric: true, label: "Infrequência" },
      ]
    : [
        { order: "registry", numeric: true, label: "Matrícula" },
        { order: "name", numeric: false, label: "Aluno" },
        { numeric: true, label: "Presenças" },
        { numeric: true, label: "Justificadas" },
        { numeric: true, label: "Faltas" },
        { numeric: true, label: "Frequências" },
        { order: "infreq", numeric: true, label: "Infrequência" },
      ];

  let school_id = "";
  if (id) {
    school_id = id;
  } else if (schoolData) school_id = schoolData.id;

  useEffect(() => {
    if (yearData) {
      let query = defineQuery(
        undefined,
        school_id,
        class_id ? class_id : undefined
      );
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
  }, [yearData, school_id, isInfreq, defineQuery, search, class_id]);

  if (dashData !== "ADMIN" && school_id.length === 0)
    return <Navigate to="/" />;

  return (
    <LayoutBasePage
      title={
        <Chip
          label="Alunos"
          color="primary"
          icon={<Group sx={{ mr: 0.5 }} fontSize="inherit" />}
        />
      }
      tools={
        <Tools
          back={back ? back : undefined}
          isSearch
          search={search}
          setSearch={(text) => setSearch(text)}
        />
      }
    >
      <TableBase headCells={headCells}>
        {data?.map((student) => (
          <CardStudent key={student.id} student={student} />
        ))}
      </TableBase>
    </LayoutBasePage>
  );
};
