import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TableCell,
  TableRow,
} from "@mui/material";
import {
  DialogFinishFrequency,
  DialogMissed,
  DialogRemoveMissed,
  TableBase,
  Tools,
} from "../../shared/components";
import {
  useAppThemeContext,
  useFrequencyContext,
  usePaginationContext,
} from "../../shared/contexts";
import { iFrequencyStudentsBase, iheadCell } from "../../shared/interfaces";
import { ChangeEvent, useEffect, useState } from "react";
import { apiFrequency } from "../../shared/services";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import relativeTime from "dayjs/plugin/relativeTime";
import { Navigate, useSearchParams } from "react-router-dom";
import { LayoutBasePage } from "../../shared/layouts";
import { Checklist } from "@mui/icons-material";
dayjs.locale("pt-br");
dayjs.extend(relativeTime);

const headCells: iheadCell[] = [
  { order: "registry", numeric: false, label: "Matrícula" },
  { order: "name", numeric: false, label: "Aluno" },
  { numeric: false, label: "Estado da Presença" },
  { numeric: false, label: "Atualizado Em" },
];

interface iCardFrequencyProps {
  student: iFrequencyStudentsBase;
}

const CardFrequency = ({ student }: iCardFrequencyProps) => {
  const { theme, defineBgColorFrequency, statusFrequencyPtBr } =
    useAppThemeContext();
  const { studentData, setStudentData } = useFrequencyContext();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(!open);

  return (
    <>
      <TableRow
        hover
        onClick={() => {
          setStudentData(student);
          setOpen(true);
        }}
        sx={{ cursor: "pointer", height: theme.spacing(10) }}
      >
        <TableCell>{student.student.registry}</TableCell>
        <TableCell>{student.student.name}</TableCell>
        <TableCell
          sx={{
            bgcolor: defineBgColorFrequency(student.status),
            color: theme.palette.secondary.contrastText,
          }}
        >
          {statusFrequencyPtBr(student.status)}
        </TableCell>
        <TableCell>
          {student.updated_at ? dayjs(student.updated_at).fromNow() : "-"}
        </TableCell>
      </TableRow>
      {studentData?.status === "PRESENTED" ? (
        <DialogMissed open={open} onClose={handleClose} student={studentData} />
      ) : (
        studentData && (
          <DialogRemoveMissed
            open={open}
            onClose={handleClose}
            student={studentData}
          />
        )
      )}
    </>
  );
};

export const RetrieveFrequencyPage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  // const { schoolData } = useAuthContext();
  // const { handleClickButtonTools } = useDrawerContext();
  const { dataStudents, setDataStudents, alterStudents, setAlterStudents } =
    useFrequencyContext();
  const { setIsLoading, query, define_step } = usePaginationContext();
  // const [dataFrequency, setDataFrequency] = useState<iFrequencyBase>();
  const [isAlter, setIsAlter] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(!open);

  useEffect(() => {
    setAlterStudents(undefined);
    setDataStudents(undefined);
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setIsAlter(event.target.checked);

  useEffect(() => {
    if (id && open) {
      const take = 3;
      let queryData = query(take);
      queryData += "&isNot_presented=true";
      setIsLoading(true);
      apiFrequency
        .students(id, queryData)
        .then((res) => {
          setAlterStudents(res.result);
          define_step(res.total, take);
        })
        .finally(() => setIsLoading(false));
    } else if (id) {
      let queryData = query();
      if (isAlter) queryData += "&is_alter=true";
      setIsLoading(true);
      apiFrequency
        .students(id, queryData)
        .then((res) => {
          // setDataFrequency(res.frequency);
          setDataStudents(res.result);
        })
        .finally(() => setIsLoading(false));
    }
  }, [id, open, query, isAlter]);

  if (!id) {
    return <Navigate to={"/frequency/create"} />;
  }

  // const title = [
  //   <LinkRouter underline="none" color="inherit" to="/frequency/create">
  //     <Chip
  //       clickable
  //       color="primary"
  //       variant="outlined"
  //       label={dataFrequency?.class.class.name}
  //       icon={<Workspaces sx={{ mr: 0.5 }} fontSize="inherit" />}
  //     />
  //   </LinkRouter>,
  //   <Chip
  //     label={dataFrequency?.date}
  //     color="primary"
  //     icon={<EventAvailable sx={{ mr: 0.5 }} fontSize="inherit" />}
  //   />,
  // ];

  return (
    <>
      <LayoutBasePage
        title=""
        tools={
          <Tools
            finish={
              <Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isAlter}
                      onChange={handleChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="Alteradas"
                />
                <Button
                  onClick={handleClose}
                  disableElevation
                  variant="contained"
                  endIcon={<Checklist />}
                >
                  Finalizar
                </Button>
              </Box>
            }
          />
        }
      >
        <TableBase
          headCells={headCells}
          is_pagination={false}
          is_message={false}
        >
          {dataStudents?.map((el) => (
            <CardFrequency key={el.id} student={el} />
          ))}
        </TableBase>
        <Box height={20} />
      </LayoutBasePage>
      {alterStudents && (
        <DialogFinishFrequency
          open={open}
          onClose={handleClose}
          frequency_id={id}
          students={alterStudents}
        />
      )}
    </>
  );
};
