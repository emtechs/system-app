import {
  FormContainer,
  RadioButtonGroup,
  TextFieldElement,
} from "react-hook-form-mui";
import {
  SelectSchoolSelectData,
  Tools,
  ValidateCPF,
} from "../../../shared/components";
import { useSchoolContext } from "../../../shared/contexts";
import { LayoutBasePage } from "../../../shared/layouts";
import { zodResolver } from "@hookform/resolvers/zod";
import { serverCreateSchema } from "../../../shared/schemas";
import { Box, Grid, Paper } from "@mui/material";

export const CreateServerAdm = () => {
  const { createServer, schoolSelect } = useSchoolContext();

  return (
    <LayoutBasePage
      title="Adicionar Servidor"
      school={<SelectSchoolSelectData />}
      tools={<Tools isHome />}
    >
      <FormContainer
        onSuccess={(data) => {
          if (schoolSelect) createServer(data, schoolSelect.id);
        }}
        resolver={zodResolver(serverCreateSchema)}
      >
        <Box
          m={2}
          display="flex"
          flexDirection="column"
          component={Paper}
          variant="outlined"
        >
          <Grid container direction="column" p={2} spacing={2}>
            <Grid container item direction="row" justifyContent="center">
              <Grid item xs={12} sm={9} md={6} lg={3}>
                <TextFieldElement name="cpf" label="CPF" required fullWidth />
              </Grid>
            </Grid>
            <Grid container item direction="row" justifyContent="center">
              <Grid item xs={12} sm={9} md={6} lg={3}>
                <TextFieldElement name="name" label="Nome" required fullWidth />
              </Grid>
            </Grid>
            <Grid container item direction="row" justifyContent="center">
              <Grid item xs={12} sm={9} md={6} lg={3}>
                <RadioButtonGroup
                  label="Tela do Usuário"
                  name="dash"
                  options={[
                    {
                      id: "COMMON",
                      label: "Comum",
                    },
                    {
                      id: "SCHOOL",
                      label: "Escola",
                    },
                  ]}
                  required
                />
              </Grid>
            </Grid>
            <Grid container item direction="row" justifyContent="center">
              <Grid item xs={12} sm={9} md={6} lg={3}>
                <ValidateCPF school_id={schoolSelect?.id} />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </FormContainer>
    </LayoutBasePage>
  );
};
