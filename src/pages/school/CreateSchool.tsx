import { Box, Button, Grid, Paper } from "@mui/material";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSchoolContext } from "../../shared/contexts";
import { schoolCreateSchema } from "../../shared/schemas";
import { LayoutSchoolPage } from "./Layout";

export const CreateSchoolPage = () => {
  const { createSchool } = useSchoolContext();

  return (
    <LayoutSchoolPage title="Nova Escola">
      <FormContainer
        onSuccess={createSchool}
        resolver={zodResolver(schoolCreateSchema)}
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
                <TextFieldElement
                  name="name"
                  label="Nome da Escola"
                  required
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container item direction="row" justifyContent="center">
              <Grid item xs={12} sm={9} md={6} lg={3}>
                <Button variant="contained" type="submit" fullWidth>
                  Salvar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </FormContainer>
    </LayoutSchoolPage>
  );
};
