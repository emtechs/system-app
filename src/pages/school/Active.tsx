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
  Typography,
} from "@mui/material";
import {
  useAppThemeContext,
  useAuthContext,
  useSchoolContext,
} from "../../shared/contexts";
import { useEffect, useState } from "react";
import { iSchoolList } from "../../shared/interfaces";
import { apiUsingNow } from "../../shared/services";
import { LayoutBasePage } from "../../shared/layouts";
import { RemoveDone } from "@mui/icons-material";
import { TableSchool, Tools } from "../../shared/components";

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
        <TableCell>{school.school_infreq}</TableCell>
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
  const { setLoading } = useAppThemeContext();
  const { yearId } = useAuthContext();
  const { updateSchoolData } = useSchoolContext();
  const [listSchoolData, setListSchoolData] = useState<iSchoolList[]>();

  useEffect(() => {
    setLoading(true);
    apiUsingNow
      .get<iSchoolList[]>(
        `schools?year_id=${yearId}&is_listSchool=true&is_active=false`
      )
      .then((res) => setListSchoolData(res.data))
      .finally(() => setLoading(false));
  }, [updateSchoolData]);

  return (
    <LayoutBasePage title="Listagem de Escolas" tools={<Tools isHome />}>
      {listSchoolData && listSchoolData.length > 0 ? (
        <TableSchool>
          <>
            {listSchoolData.map((el) => (
              <CardSchool key={el.id} school={el} />
            ))}
          </>
        </TableSchool>
      ) : (
        <Typography m={2}>Nenhuma escola para ativar no momento!</Typography>
      )}
    </LayoutBasePage>
  );
};
