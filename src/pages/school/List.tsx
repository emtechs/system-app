import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TableCell,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import {
  useAppThemeContext,
  useAuthContext,
  useFrequencyContext,
  useSchoolContext,
} from "../../shared/contexts";
import { useEffect, useState } from "react";
import { iSchoolList } from "../../shared/interfaces";
import { apiUsingNow } from "../../shared/services";
import { LayoutBasePage } from "../../shared/layouts";
import { TableSchool, Tools } from "../../shared/components";
import { defineBgColorInfrequency } from "../../shared/scripts";
import { useNavigate } from "react-router-dom";

interface iCardSchoolProps {
  school: iSchoolList;
}

const CardSchool = ({ school }: iCardSchoolProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { updateSchoolData, setUpdateSchoolData, updateSchool } =
    useSchoolContext();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setUpdateSchoolData(school);
    setOpen((oldOpen) => !oldOpen);
  };

  return (
    <>
      <TableRow
        hover
        sx={{ cursor: "pointer" }}
        onClick={() => {
          navigate(`/school/${school.id}`);
        }}
      >
        <TableCell>{school.name}</TableCell>
        <TableCell>{school.director?.name}</TableCell>
        <TableCell>{school.num_classes}</TableCell>
        <TableCell>{school.num_students}</TableCell>
        <TableCell>{school.num_frequencies}</TableCell>
        <TableCell
          sx={{
            color: "#fff",
            bgcolor: defineBgColorInfrequency(school.school_infreq, theme),
          }}
        >
          {school.school_infreq}%
        </TableCell>
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

export const ListSchoolPage = () => {
  const { setLoading } = useAppThemeContext();
  const { yearId } = useAuthContext();
  const { updateSchoolData } = useSchoolContext();
  const { isInfreq } = useFrequencyContext();
  const [listSchoolData, setListSchoolData] = useState<iSchoolList[]>();

  useEffect(() => {
    if (yearId) {
      setLoading(true);
      let query = `?year_id=${yearId}&is_listSchool=true`;
      if (isInfreq) query += "&school_infreq=31";
      apiUsingNow
        .get<iSchoolList[]>(`schools${query}`)
        .then((res) => setListSchoolData(res.data))
        .finally(() => setLoading(false));
    }
  }, [yearId, updateSchoolData, isInfreq]);

  return (
    <LayoutBasePage title="Listagem de Escolas" tools={<Tools isHome isFreq />}>
      {listSchoolData && listSchoolData.length > 0 ? (
        <TableSchool>
          <>
            {listSchoolData.map((el) => (
              <CardSchool key={el.id} school={el} />
            ))}
          </>
        </TableSchool>
      ) : (
        <Typography m={2}>Nenhuma escola ativa no momento!</Typography>
      )}
    </LayoutBasePage>
  );
};
