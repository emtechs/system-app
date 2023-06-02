import { BasePage, BoxResp, SelectClass } from "../../shared/components";
import {
  useAppThemeContext,
  useClassContext,
  useSchoolContext,
  useUserContext,
} from "../../shared/contexts";
import { CheckboxButtonGroup, FormContainer } from "react-hook-form-mui";
import { zodResolver } from "@hookform/resolvers/zod";
import { schoolUpdateDirectorSchema } from "../../shared/schemas";
import { useEffect } from "react";
import { iPageProps, iSchool } from "../../shared/interfaces";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { apiUsingNow } from "../../shared/services";

export const DefineSchoolsPage = ({ back }: iPageProps) => {
  const navigate = useNavigate();
  const { updateAllUser } = useUserContext();
  const { setLoading } = useAppThemeContext();
  const { schoolSelect, updateSchool, schoolDataSelect, setSchoolDataSelect } =
    useSchoolContext();
  const { classSelect, setClassSelect } = useClassContext();

  useEffect(() => {
    setClassSelect(undefined);
    setLoading(true);
    apiUsingNow
      .get<iSchool[]>("schools?is_active=true")
      .then((res) => {
        if (res.data) {
          setSchoolDataSelect(
            res.data.map((school) => {
              return { ...school, label: school.name };
            })
          );
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <BasePage isProfile back={back}>
        {schoolDataSelect && schoolDataSelect.length > 0 ? (
          <FormContainer
            onSuccess={(data) => {
              if (schoolSelect) {
                if (schoolSelect.director) {
                  updateAllUser(
                    schoolSelect.director.id,
                    {
                      is_active: false,
                      role: "SERV",
                    },
                    true
                  );
                }
                updateSchool(data, schoolSelect.id, "diretor", back);
              }
            }}
            resolver={zodResolver(schoolUpdateDirectorSchema)}
          >
            <BoxResp isProfile>
              <CheckboxButtonGroup
                label="Escolas"
                name="basic-checkbox-button-group"
                options={schoolDataSelect ? schoolDataSelect : []}
              />
              <Button variant="contained" type="submit" fullWidth>
                Salvar
              </Button>
            </BoxResp>
          </FormContainer>
        ) : (
          <Typography>Nenhuma escola ativa ou cadastrada!</Typography>
        )}
      </BasePage>
      <Dialog open={!classSelect} onClose={() => navigate(back ? back : "/")}>
        <DialogTitle>Definir Escolas</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Selecione a turma que você deseja definir as escolas.
          </DialogContentText>
          <FormContainer>
            <Box mt={1} display="flex" flexDirection="column" gap={1}>
              <SelectClass />
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
