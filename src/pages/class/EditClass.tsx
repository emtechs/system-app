import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { iPageProps } from "../../shared/interfaces";
import { useSchoolContext } from "../../shared/contexts";
import { useEffect } from "react";
import {
  BasePage,
  BoxResp,
  SelectClass,
  SelectSchool,
} from "../../shared/components";
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

export const EditClass = ({ back }: iPageProps) => {
  const navigate = useNavigate();
  const { updateSchool, schoolSelect, classSelect, setClassSelect } =
    useSchoolContext();

  useEffect(() => {
    setClassSelect(undefined);
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
            {classSelect && (
              <Box>
                <Typography>Informações Atuais</Typography>
                <Typography>Nome da Turma: {classSelect.name}</Typography>
                <Typography>Escola da Turma: {schoolSelect?.name}</Typography>
              </Box>
            )}

            <TextFieldElement
              name="name"
              label="Nome da Turma"
              required
              fullWidth
            />
            <Button variant="contained" type="submit" fullWidth>
              Enviar
            </Button>
          </BoxResp>
        </FormContainer>
      </BasePage>
      <Dialog open={!classSelect} onClose={() => navigate(back ? back : "/")}>
        <DialogTitle>Editar Turma</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Selecione a escola e, em seguida, a turma que você deseja editar.
          </DialogContentText>
          <FormContainer>
            <Box mt={1} display="flex" flexDirection="column" gap={1}>
              <SelectSchool />
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
