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
import { useEffect, useState } from "react";
import { iSchool, iSchoolSelect } from "../../shared/interfaces";
import { apiUsingNow } from "../../shared/services";
import { BasePage } from "../../shared/components";

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
        <DialogTitle>Ativar Escola</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deseja continuar ativando {schoolSelect?.name.toUpperCase()}?
          </DialogContentText>
          <DialogActions>
            <Button onClick={() => setschoolSelect(undefined)}>Cancelar</Button>
            <Button
              onClick={() => {
                if (schoolSelect)
                  updateSchool(
                    {
                      is_active: true,
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

interface iActiveSchoolProps {
  back: string;
}

export const ActiveSchool = ({ back }: iActiveSchoolProps) => {
  const theme = useTheme();
  const { setLoading } = useAppThemeContext();
  const { schoolSelect, setListSchoolData } = useSchoolContext();
  const [schoolsData, setSchoolsData] = useState<iSchoolSelect[]>();

  useEffect(() => {
    setLoading(true);
    apiUsingNow
      .get<iSchool[]>("schools?is_active=false")
      .then((res) => {
        if (res.data) {
          setListSchoolData(res.data);
          setSchoolsData(
            res.data.map((school) => {
              return { ...school, label: school.name };
            })
          );
        }
      })
      .finally(() => setLoading(false));
  }, [schoolSelect]);

  return (
    <BasePage isProfile back={back}>
      {schoolsData && schoolsData.length > 0 ? (
        <Box display="flex" flexDirection="column" gap={theme.spacing(2)}>
          {schoolsData.map((school) => (
            <CardSchool key={school.id} school={school} theme={theme} />
          ))}
        </Box>
      ) : (
        <Typography>Nenhuma escola para ativar no momento!</Typography>
      )}
    </BasePage>
  );
};
