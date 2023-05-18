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
import { iSchool } from "../../shared/interfaces";
import { apiUsingNow } from "../../shared/services";
import { BasePage } from "../../shared/components";

interface iCardSchoolProps {
  school: iSchool;
  theme: Theme;
}

const CardSchool = ({ school, theme }: iCardSchoolProps) => {
  const { schoolSelect, setschoolSelect, updateSchool } = useSchoolContext();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setschoolSelect(school);
    setOpen(!open);
  };
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
          onClick={handleClose}
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
            <Box>
              <Typography
                fontSize={10}
                color={theme.palette.secondary.contrastText}
              >
                {school.name}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {schoolSelect && (
        <Dialog open={open} onClose={handleClose}>
          {schoolSelect.is_active ? (
            <>
              <DialogTitle>Desativar Escola</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Deseja continuar desativando o usúario{" "}
                  {schoolSelect.name.toUpperCase()}?
                </DialogContentText>
                <DialogActions>
                  <Button onClick={handleClose}>Cancelar</Button>
                  <Button
                    onClick={() => {
                      updateSchool(
                        {
                          is_active: false,
                        },
                        schoolSelect.id
                      );
                      setOpen(!open);
                    }}
                  >
                    Continuar
                  </Button>
                </DialogActions>
              </DialogContent>
            </>
          ) : (
            <>
              <DialogTitle>Ativar Escola</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Deseja continuar ativando o usúario{" "}
                  {schoolSelect.name.toUpperCase()}?
                </DialogContentText>
                <DialogActions>
                  <Button onClick={handleClose}>Cancelar</Button>
                  <Button
                    onClick={() => {
                      updateSchool(
                        {
                          is_active: true,
                        },
                        schoolSelect.id
                      );
                      setOpen(!open);
                    }}
                  >
                    Continuar
                  </Button>
                </DialogActions>
              </DialogContent>
            </>
          )}
        </Dialog>
      )}
    </>
  );
};

interface iListUserProps {
  back: string;
}

export const ListSchool = ({ back }: iListUserProps) => {
  const theme = useTheme();
  const { setLoading } = useAppThemeContext();
  const { schoolSelect } = useSchoolContext();
  const [listSchoolData, setListSchoolData] = useState<iSchool[]>();

  useEffect(() => {
    setLoading(true);
    apiUsingNow
      .get<iSchool[]>("schools/")
      .then((res) => setListSchoolData(res.data))
      .finally(() => setLoading(false));
  }, [schoolSelect]);
  return (
    <BasePage isProfile back={back}>
      {listSchoolData && (
        <Box display="flex" flexDirection="column" gap={theme.spacing(2)}>
          {listSchoolData.map((school) => (
            <CardSchool key={school.id} school={school} theme={theme} />
          ))}
        </Box>
      )}
    </BasePage>
  );
};
