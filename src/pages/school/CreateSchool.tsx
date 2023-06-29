import { Box, Button, Chip, Grid, Paper } from "@mui/material";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSchoolContext } from "../../shared/contexts";
import { schoolCreateSchema } from "../../shared/schemas";
import { LayoutBasePage } from "../../shared/layouts";
import { TitleSchoolAdminPages } from "../../shared/components";
import { AddBox } from "@mui/icons-material";

export const CreateSchoolPage = () => {
  const { createSchool } = useSchoolContext();

  const breadcrumbs = [
    <Chip
      label="Nova Escola"
      color="primary"
      icon={<AddBox sx={{ mr: 0.5 }} fontSize="inherit" />}
    />,
  ];

  return (
    <LayoutBasePage title={<TitleSchoolAdminPages breadcrumbs={breadcrumbs} />}>
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
    </LayoutBasePage>
  );
};
