import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { iDirector, iPageProps } from "../../shared/interfaces";
import { useSchoolContext, useUserContext } from "../../shared/contexts";
import { useEffect, useState } from "react";
import {
  BasePage,
  BoxResp,
  SelectSchool,
  ValidateCPF,
} from "../../shared/components";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  schoolUpdateDirectorSchema,
  schoolUpdateSchema,
} from "../../shared/schemas";
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

export const EditSchool = ({ back }: iPageProps) => {
  const navigate = useNavigate();
  const { updateAllUser } = useUserContext();
  const { updateSchool, schoolSelect, setSchoolSelect } = useSchoolContext();
  const [updateDirectorData, setUpdateDirectorData] = useState<iDirector>();
  const handleClose = () => setUpdateDirectorData(undefined);

  useEffect(() => {
    setSchoolSelect(undefined);
  }, []);

  return (
    <>
      <BasePage isProfile back={back}>
        <FormContainer
          onSuccess={(data) => {
            if (schoolSelect) updateSchool(data, schoolSelect.id, "nome", back);
          }}
          resolver={zodResolver(schoolUpdateSchema)}
        >
          <BoxResp isProfile>
            {schoolSelect && (
              <Box>
                <Typography>Informações Atuais</Typography>
                <Typography>Nome da Escola: {schoolSelect.name}</Typography>
                <Typography>
                  Diretor da Escola: {schoolSelect.director.name}
                </Typography>
                <Typography>CPF: {schoolSelect.director.cpf}</Typography>
              </Box>
            )}

            <TextFieldElement
              name="name"
              label="Nome da Escola"
              required
              fullWidth
            />
            <Button variant="contained" type="submit" fullWidth>
              Enviar
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setUpdateDirectorData(schoolSelect?.director)}
              fullWidth
            >
              Alterar Diretor
            </Button>
          </BoxResp>
        </FormContainer>
      </BasePage>
      {updateDirectorData && (
        <Dialog open={!!updateDirectorData} onClose={handleClose}>
          <DialogTitle>Editar Diretor</DialogTitle>
          <DialogContent>
            <FormContainer
              onSuccess={(data) => {
                updateAllUser(
                  updateDirectorData.id,
                  {
                    is_active: false,
                    role: "SERV",
                  },
                  true
                );
                if (schoolSelect)
                  updateSchool(data, schoolSelect.id, "diretor", back);
                setUpdateDirectorData(undefined);
              }}
              resolver={zodResolver(schoolUpdateDirectorSchema)}
            >
              <Box mt={1} display="flex" flexDirection="column" gap={1}>
                <TextFieldElement
                  name="cpf"
                  label="CPF do Diretor"
                  required
                  fullWidth
                />
                <TextFieldElement
                  name="name_diret"
                  label="Nome do Diretor"
                  required
                  fullWidth
                />
                <ValidateCPF allNotServ />
              </Box>
            </FormContainer>
            <DialogActions>
              <Button onClick={handleClose}>Cancelar</Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      )}
      <Dialog open={!schoolSelect} onClose={() => navigate(back ? back : "/")}>
        <DialogTitle>Editar Escola</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Selecione a Escola que deseja editar
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
