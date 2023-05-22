import { FormContainer } from "react-hook-form-mui";
import { iClass, iPageProps } from "../../shared/interfaces";
import { useSchoolContext } from "../../shared/contexts";
import { useEffect, useState } from "react";
import { BasePage, SelectSchool } from "../../shared/components";
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
import { useNavigate } from "react-router-dom";

interface iCardClassProps {
  el: iClass;
  theme: Theme;
}

const CardClass = ({ el, theme }: iCardClassProps) => {
  const { updateSchool } = useSchoolContext();
  const [classSelect, setClassSelect] = useState<iClass>();

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
          bgcolor: theme.palette.success.main,
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
        <DialogTitle>Desativar Turma</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deseja continuar desativando {classSelect?.name.toUpperCase()}?
          </DialogContentText>
          <DialogActions>
            <Button onClick={() => setClassSelect(undefined)}>Cancelar</Button>
            <Button
              onClick={() => {
                if (classSelect)
                  updateSchool(
                    {
                      is_active: false,
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

export const ListClass = ({ back }: iPageProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { schoolSelect, setSchoolSelect, listClassData } = useSchoolContext();

  useEffect(() => {
    setSchoolSelect(undefined);
  }, []);

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
          <Typography>Nenhuma turma ativa ou cadastrada!</Typography>
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
