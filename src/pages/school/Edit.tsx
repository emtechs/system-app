import { useSchoolContext } from "../../shared/contexts";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { zodResolver } from "@hookform/resolvers/zod";
import { schoolUpdateSchema } from "../../shared/schemas";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { LayoutSchoolPage } from "./Layout";

export const EditSchoolPage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { updateSchool, schoolSelect } = useSchoolContext();
  let school_id = "";
  if (id) {
    school_id = id;
  } else if (schoolSelect) school_id = schoolSelect.id;

  return (
    <LayoutSchoolPage title="Editar Escola" isSchool>
      <FormContainer
        onSuccess={(data) => {
          const back = id ? `/school/${id}` : "/";
          updateSchool(data, school_id, "nome", back);
        }}
        resolver={zodResolver(schoolUpdateSchema)}
      >
        <Box
          m={2}
          display="flex"
          flexDirection="column"
          component={Paper}
          variant="outlined"
        >
          <Grid container direction="column" p={2} spacing={2}>
            {schoolSelect && (
              <Grid container item direction="row" justifyContent="center">
                <Grid
                  item
                  xs={12}
                  sm={9}
                  md={6}
                  lg={3}
                  display="flex"
                  justifyContent="center"
                >
                  <Box>
                    <Typography>Informações Atuais</Typography>
                    <Typography>Nome da Escola: {schoolSelect.name}</Typography>
                  </Box>
                </Grid>
              </Grid>
            )}
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
