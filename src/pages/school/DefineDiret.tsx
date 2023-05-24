import {
  BasePage,
  BoxResp,
  SelectSchool,
  ValidateCPF,
} from "../../shared/components";
import { useSchoolContext, useUserContext } from "../../shared/contexts";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { zodResolver } from "@hookform/resolvers/zod";
import { schoolUpdateDirectorSchema } from "../../shared/schemas";
import { useEffect } from "react";
import { iPageProps } from "../../shared/interfaces";
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

export const DefineDiret = ({ back }: iPageProps) => {
  const navigate = useNavigate();
  const { updateAllUser } = useUserContext();
  const { schoolSelect, setSchoolSelect, updateSchool } = useSchoolContext();

  useEffect(() => {
    setSchoolSelect(undefined);
  }, []);

  return (
    <>
      <BasePage isProfile back={back}>
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
            {schoolSelect?.director && (
              <Box>
                <Typography>Diretor Atual</Typography>
                <Typography>Nome: {schoolSelect.director.name}</Typography>
                <Typography>CPF: {schoolSelect.director.cpf}</Typography>
              </Box>
            )}
            <TextFieldElement name="cpf" label="CPF" required fullWidth />
            <TextFieldElement
              name="name_diret"
              label="Nome"
              required
              fullWidth
            />
            <ValidateCPF allNotServ />
          </BoxResp>
        </FormContainer>
      </BasePage>
      <Dialog open={!schoolSelect} onClose={() => navigate(back ? back : "/")}>
        <DialogTitle>Definir Diretor</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Selecione a Escola que deseja Definir o Diretor
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
