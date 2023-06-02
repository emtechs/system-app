import { FormContainer, PasswordElement } from "react-hook-form-mui";
import { LayoutBasePage } from "../../shared/layouts";
import { useAuthContext, useUserContext } from "../../shared/contexts";
import { zodResolver } from "@hookform/resolvers/zod";
import { userPasswordSchema } from "../../shared/schemas";
import { Box, Button, Grid, Paper } from "@mui/material";

export const EditPasswordPage = () => {
  const { userData } = useAuthContext();
  const { editPassword } = useUserContext();
  return (
    <LayoutBasePage title="Editar Senha">
      <FormContainer
        onSuccess={(data) => {
          if (userData) editPassword(userData.id, data);
        }}
        resolver={zodResolver(userPasswordSchema)}
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
                <PasswordElement
                  name="old_password"
                  label="Senha Atual"
                  required
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container item direction="row" justifyContent="center">
              <Grid item xs={12} sm={9} md={6} lg={3}>
                <PasswordElement
                  name="password"
                  label="Nova Senha"
                  required
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container item direction="row" justifyContent="center">
              <Grid item xs={12} sm={9} md={6} lg={3}>
                <PasswordElement
                  name="repeat_password"
                  label="Confirmar Nova Senha"
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
