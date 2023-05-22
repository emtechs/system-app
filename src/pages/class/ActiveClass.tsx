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
import { iClass, iPageProps } from "../../shared/interfaces";
import { apiUsingNow } from "../../shared/services";
import { BasePage, SelectSchool } from "../../shared/components";
import { useNavigate } from "react-router-dom";
import { FormContainer } from "react-hook-form-mui";

interface iCardClassProps {
  el: iClass;
  theme: Theme;
}

const CardClass = ({ el, theme }: iCardClassProps) => {
  const { classSelect, updateSchool, setClassSelect } = useSchoolContext();

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
          bgcolor: theme.palette.error.main,
        }}
      >
        <CardContent
          onClick={() => setClassSelect(el)}
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            cursor: "pointer",
            position: "relative",
          }}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar>{el.name[0].toUpperCase()}</Avatar>
            <Box display="flex" flexDirection="column" gap={0.5}>
              <Typography
                fontSize={12}
                color={theme.palette.secondary.contrastText}
              >
                {el.name}
              </Typography>
              <Typography
                fontSize={12}
                color={theme.palette.secondary.contrastText}
              >
                Alunos: {el._count.students}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <Dialog open={!!classSelect} onClose={() => setClassSelect(undefined)}>
        <DialogTitle>Ativar Escola</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deseja continuar ativando {classSelect?.name.toUpperCase()}?
          </DialogContentText>
          <DialogActions>
            <Button onClick={() => setClassSelect(undefined)}>Cancelar</Button>
            <Button
              onClick={() => {
                if (classSelect)
                  updateSchool(
                    {
                      is_active: true,
                    },
                    classSelect.id,
                    "estado"
                  );
                setClassSelect(undefined);
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

export const ActiveClass = ({ back }: iPageProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { setLoading } = useAppThemeContext();
  const { schoolSelect, setSchoolSelect } = useSchoolContext();
  const [listClassData, setListClassData] = useState<iClass[]>();

  useEffect(() => {
    setSchoolSelect(undefined);
  }, []);

  useEffect(() => {
    setLoading(true);
    apiUsingNow
      .get<iClass[]>(`classes?school_id=${schoolSelect?.id}&is_active=false`)
      .then((res) => {
        if (res.data) {
          setListClassData(res.data);
        }
      })
      .finally(() => setLoading(false));
  }, [schoolSelect]);

  return (
    <>
      <BasePage isProfile back={back}>
        {listClassData && listClassData.length > 0 ? (
          <Box display="flex" flexDirection="column" gap={theme.spacing(2)}>
            {listClassData.map((el) => (
              <CardClass key={el.id} el={el} theme={theme} />
            ))}
          </Box>
        ) : (
          <Typography>Nenhuma turma para ativar no momento!</Typography>
        )}
      </BasePage>
      <Dialog open={!schoolSelect} onClose={() => navigate(back ? back : "/")}>
        <DialogTitle>Listar Turmas</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Selecione uma escola para listar as turmas desejadas.
          </DialogContentText>
          <FormContainer>
            <Box mt={1} display="flex" flexDirection="column" gap={1}>
              <SelectSchool />
            </Box>
          </FormContainer>
          <DialogActions>
            <Button onClick={() => navigate(back ? back : "/")}>
              Cancelar
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};
