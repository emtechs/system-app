import { iClass, iPageProps } from "../../shared/interfaces";
import {
  useAppThemeContext,
  useClassContext,
  useSchoolContext,
} from "../../shared/contexts";
import { useEffect, useState } from "react";
import { BasePage } from "../../shared/components";
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
import { apiUsingNow } from "../../shared/services";

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
  const { setLoading } = useAppThemeContext();
  const { setListClassData, listClassData } = useClassContext();

  useEffect(() => {
    setLoading(true);
    apiUsingNow
      .get<iClass[]>("classes?&is_active=true")
      .then((res) => {
        if (res.data) {
          setListClassData(res.data);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
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
  );
};
