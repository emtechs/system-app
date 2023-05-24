import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { iPageProps } from "../../shared/interfaces";
import { useSchoolContext } from "../../shared/contexts";
import { useEffect } from "react";
import { BasePage, BoxResp, SelectSchool } from "../../shared/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { schoolUpdateSchema } from "../../shared/schemas";
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
  const { updateSchool, schoolSelect, setSchoolSelect } = useSchoolContext();

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
          </BoxResp>
        </FormContainer>
      </BasePage>
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
