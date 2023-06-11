import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
} from "@mui/material";
import {
  useAuthContext,
  useSchoolContext,
  useTableContext,
} from "../../shared/contexts";
import { useEffect, useState } from "react";
import { iSchoolList, iheadCell } from "../../shared/interfaces";
import { apiUsingNow } from "../../shared/services";
import { RemoveDone } from "@mui/icons-material";
import { TableBase } from "../../shared/components";
import { LayoutSchoolPage } from "./Layout";

const headCells: iheadCell[] = [
  { order: "name", numeric: false, label: "Escola" },
  { order: "director_name", numeric: false, label: "Diretor" },
  { numeric: true, label: "Turmas" },
  { numeric: true, label: "Alunos" },
  { numeric: true, label: "Frequências" },
  { order: "infreq", numeric: true, label: "Infrequência" },
];

interface iCardSchoolProps {
  school: iSchoolList;
}

const CardSchool = ({ school }: iCardSchoolProps) => {
  const { updateSchoolData, setUpdateSchoolData, updateSchool } =
    useSchoolContext();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setUpdateSchoolData(school);
    setOpen((oldOpen) => !oldOpen);
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <Tooltip title="Ativar Escola">
            <IconButton color="error" onClick={handleClose}>
              <RemoveDone />
            </IconButton>
          </Tooltip>
        </TableCell>
        <TableCell>{school.name}</TableCell>
        <TableCell>{school.director?.name}</TableCell>
        <TableCell>{school.num_classes}</TableCell>
        <TableCell>{school.num_students}</TableCell>
        <TableCell>{school.num_frequencies}</TableCell>
        <TableCell>{school.infreq}</TableCell>
      </TableRow>

      {updateSchoolData && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Desativar Escola</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Deseja continuar desativando a Escola{" "}
              {updateSchoolData.name.toUpperCase()}?
            </DialogContentText>
            <DialogActions>
              <Button onClick={handleClose}>Cancelar</Button>
              <Button
                onClick={() => {
                  updateSchool(
                    {
                      is_active: false,
                    },
                    updateSchoolData.id,
                    "estado"
                  );
                  setOpen(false);
                }}
              >
                Continuar
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export const ActiveSchoolPage = () => {
  const { yearId } = useAuthContext();
  const { updateSchoolData } = useSchoolContext();
  const { setIsLoading } = useTableContext();
  const [listSchoolData, setListSchoolData] = useState<iSchoolList[]>();

  useEffect(() => {
    setIsLoading(true);
    apiUsingNow
      .get<{ result: iSchoolList[] }>(
        `schools?year_id=${yearId}&is_listSchool=true&is_active=false`
      )
      .then((res) => setListSchoolData(res.data.result))
      .finally(() => setIsLoading(false));
  }, [updateSchoolData]);

  return (
    <LayoutSchoolPage title="Listagem de Escolas">
      <TableBase headCells={headCells} is_active>
        {listSchoolData?.map((el) => (
          <CardSchool key={el.id} school={el} />
        ))}
      </TableBase>
    </LayoutSchoolPage>
  );
};
