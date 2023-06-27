import {
  Box,
  Breadcrumbs,
  Chip,
  TableCell,
  TableRow,
  useTheme,
} from "@mui/material";
import { LinkRouter, TableBase } from "../../../shared/components";
import {
  useAuthContext,
  useDrawerContext,
  useFrequencyContext,
  usePaginationContext,
} from "../../../shared/contexts";
import {
  iFrequencyBase,
  iFrequencyStudentsBase,
  iheadCell,
} from "../../../shared/interfaces";
import { useEffect, useState } from "react";
import { apiFrequency } from "../../../shared/services";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { LayoutBasePage } from "../../../shared/layouts";
import {
  defineBgColorFrequency,
  statusFrequencyPtBr,
} from "../../../shared/scripts";
import { EventAvailable, Group, School } from "@mui/icons-material";

const headCells: iheadCell[] = [
  { order: "registry", numeric: false, label: "Matrícula" },
  { order: "name", numeric: false, label: "Aluno" },
  { numeric: false, label: "Estado da Presença" },
];

interface iCardFrequencyProps {
  student: iFrequencyStudentsBase;
}

const CardFrequency = ({ student }: iCardFrequencyProps) => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <TableRow
      hover
      onClick={() => navigate(`/frequency/student?id=${student.student.id}`)}
      sx={{ cursor: "pointer" }}
    >
      <TableCell>{student.student.registry}</TableCell>
      <TableCell>{student.student.name}</TableCell>
      <TableCell
        sx={{
          bgcolor: defineBgColorFrequency(student.status, theme),
          color: theme.palette.secondary.contrastText,
        }}
      >
        {statusFrequencyPtBr(student.status)}
      </TableCell>
    </TableRow>
  );
};

export const ListStudentFrequencyPage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { schoolData } = useAuthContext();
  const { dataStudents, setDataStudents } = useFrequencyContext();
  const { handleClickButtonTools } = useDrawerContext();
  const { setIsLoading, defineQuery, setCount } = usePaginationContext();
  const [dataFrequency, setDataFrequency] = useState<iFrequencyBase>();

  useEffect(() => {
    setDataStudents(undefined);
  }, []);

  useEffect(() => {
    if (id) {
      const queryData = defineQuery();
      setIsLoading(true);
      apiFrequency
        .students(id, queryData)
        .then((res) => {
          setCount(res.total);
          setDataFrequency(res.frequency);
          setDataStudents(res.result);
        })
        .finally(() => setIsLoading(false));
    }
  }, [id, open, defineQuery]);

  if (!id) {
    return <Navigate to={"/frequency/list"} />;
  }

  return (
    <LayoutBasePage
      title={
        <Breadcrumbs aria-label="breadcrumb">
          <LinkRouter
            underline="none"
            color="inherit"
            to="/"
            onClick={handleClickButtonTools}
          >
            <Chip
              clickable
              color="primary"
              variant="outlined"
              label={schoolData?.name}
              icon={<School sx={{ mr: 0.5 }} fontSize="inherit" />}
            />
          </LinkRouter>
          {dataFrequency && (
            <LinkRouter underline="none" color="inherit" to="/frequency/list">
              <Chip
                clickable
                color="primary"
                variant="outlined"
                label={dataFrequency.date}
                icon={<EventAvailable sx={{ mr: 0.5 }} fontSize="inherit" />}
              />
            </LinkRouter>
          )}
          <Chip
            label="Alunos"
            color="primary"
            icon={<Group sx={{ mr: 0.5 }} fontSize="inherit" />}
          />
        </Breadcrumbs>
      }
    >
      <TableBase headCells={headCells}>
        {dataStudents?.map((el) => (
          <CardFrequency key={el.id} student={el} />
        ))}
      </TableBase>
      <Box height={20} />
    </LayoutBasePage>
  );
};