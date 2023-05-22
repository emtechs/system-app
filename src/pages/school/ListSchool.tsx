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
import { useAppThemeContext, useSchoolContext } from "../../shared/contexts";
import { iPageProps, iSchool } from "../../shared/interfaces";
import { BasePage } from "../../shared/components";
import { useEffect } from "react";
import { apiUsingNow } from "../../shared/services";

interface iCardSchoolProps {
  school: iSchool;
  theme: Theme;
}

const CardSchool = ({ school, theme }: iCardSchoolProps) => {
  const { schoolSelect, setSchoolSelect, updateSchool } = useSchoolContext();

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
          onClick={() => setSchoolSelect(school)}
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
      <Dialog open={!!schoolSelect} onClose={() => setSchoolSelect(undefined)}>
        <DialogTitle>Desativar Escola</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deseja continuar desativando {schoolSelect?.name.toUpperCase()}?
          </DialogContentText>
          <DialogActions>
            <Button onClick={() => setSchoolSelect(undefined)}>Cancelar</Button>
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
                setSchoolSelect(undefined);
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

export const ListSchool = ({ back }: iPageProps) => {
  const theme = useTheme();
  const { setLoading } = useAppThemeContext();
  const { listSchoolData, setSchoolSelect, setListSchoolData } =
    useSchoolContext();

  useEffect(() => {
    setSchoolSelect(undefined);
    setLoading(true);
    apiUsingNow
      .get<iSchool[]>("schools?is_active=true")
      .then((res) => {
        if (res.data) {
          setListSchoolData(res.data);
        }
      })
      .finally(() => setLoading(false));
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
