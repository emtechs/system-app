import { ValidateCPF } from "../../shared/components";
import { useUserContext } from "../../shared/contexts";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAdmSchema } from "../../shared/schemas";
import { LayoutBasePage } from "../../shared/layouts";
import { Box, Grid, Paper } from "@mui/material";

export const CreateAdm = () => {
  const { createAdm } = useUserContext();

  return (
    <LayoutBasePage title="Novo Administrador">
      <FormContainer
        onSuccess={(data) => {
          createAdm(data);
        }}
        resolver={zodResolver(createAdmSchema)}
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
                <ValidateCPF />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </FormContainer>
    </LayoutBasePage>
  );
};
