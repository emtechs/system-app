import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { LayoutBasePage } from "../../shared/layouts";
import { useAuthContext, useUserContext } from "../../shared/contexts";
import { zodResolver } from "@hookform/resolvers/zod";
import { userUpdateSchema } from "../../shared/schemas";
import { Box, Button, Grid, Paper } from "@mui/material";

export const EditProfilePage = () => {
  const { userData } = useAuthContext();
  const { updateUser } = useUserContext();
  return (
    <LayoutBasePage title="Editar Perfil">
      <FormContainer
        defaultValues={{
          name: userData ? userData.name : "",
          email: userData ? userData.email : "",
        }}
        onSuccess={(data) => {
          if (userData) updateUser(userData.id, data);
        }}
        resolver={zodResolver(userUpdateSchema)}
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
              <Grid item xs={12} sm={9} md={6}>
                <TextFieldElement
                  name="name"
                  label="Nome completo"
                  required
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container item direction="row" justifyContent="center">
              <Grid item xs={12} sm={9} md={6}>
                <TextFieldElement
                  name="email"
                  label="Email"
                  required
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container item direction="row" justifyContent="center">
              <Grid item xs={12} sm={9} md={6} lg={3}>
                <Button variant="contained" type="submit" fullWidth>
                  Enviar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </FormContainer>
    </LayoutBasePage>
  );
};
