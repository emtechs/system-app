import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import { useSchoolContext } from "../../shared/contexts";
import { iSchool } from "../../shared/interfaces";
import { BasePage } from "../../shared/components";
import { useEffect } from "react";

interface iCardSchoolProps {
  school: iSchool;
  theme: Theme;
}

const CardSchool = ({ school, theme }: iCardSchoolProps) => {
  const { schoolSelect, setschoolSelect, updateSchool } = useSchoolContext();

  return (
    <>
      <Card
        sx={{
          width: "100%",
          height: 80,
          maxWidth: 250,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: school.is_active
            ? theme.palette.success.main
            : theme.palette.error.main,
        }}
      >
        <CardContent
          onClick={() => setschoolSelect(school)}
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            cursor: "pointer",
            position: "relative",
          }}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar>{school.name[0].toUpperCase()}</Avatar>
            <Box display="flex" flexDirection="column" gap={0.5}>
              <Typography
                fontSize={12}
                color={theme.palette.secondary.contrastText}
              >
                {school.name}
              </Typography>
              <Typography
                fontSize={12}
                color={theme.palette.secondary.contrastText}
              >
                Diretor: {school.director.name}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <Dialog open={!!schoolSelect} onClose={() => setschoolSelect(undefined)}>
        <DialogTitle>Desativar Escola</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deseja continuar desativando {schoolSelect?.name.toUpperCase()}?
          </DialogContentText>
          <DialogActions>
            <Button onClick={() => setschoolSelect(undefined)}>Cancelar</Button>
            <Button
              onClick={() => {
                if (schoolSelect)
                  updateSchool(
                    {
                      is_active: false,
                    },
                    schoolSelect.id,
                    "estado"
                  );
                setschoolSelect(undefined);
              }}
            >
              Continuar
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

interface iListSchoolProps {
  back: string;
}

export const ListSchool = ({ back }: iListSchoolProps) => {
  const theme = useTheme();
  const { listSchoolData, setschoolSelect } = useSchoolContext();

  useEffect(() => {
    setschoolSelect(undefined);
  }, []);

  return (
    <BasePage isProfile back={back}>
      {listSchoolData && listSchoolData.length > 0 ? (
        <Box display="flex" flexDirection="column" gap={theme.spacing(2)}>
          {listSchoolData.map((school) => (
            <CardSchool key={school.id} school={school} theme={theme} />
          ))}
        </Box>
      ) : (
        <Typography>Nenhuma escola ativa ou cadastrada!</Typography>
      )}
    </BasePage>
  );
};
