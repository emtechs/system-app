import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { useSchoolContext } from "../../../shared/contexts";
import { LayoutBasePage } from "../../../shared/layouts";
import { schoolCreateSchema } from "../../../shared/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Grid, Paper } from "@mui/material";
import { Tools } from "../../../shared/components";

export const CreateSchoolPage = () => {
  const { createSchool } = useSchoolContext();

  return (
    <LayoutBasePage title="Nova Escola" tools={<Tools isHome />}>
      <FormContainer
        onSuccess={(data) => createSchool(data)}
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
    </LayoutBasePage>
  );
};
