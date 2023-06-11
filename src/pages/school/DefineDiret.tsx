import { useSearchParams } from "react-router-dom";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { useSchoolContext, useUserContext } from "../../shared/contexts";
import { ValidateCPF } from "../../shared/components";
import { schoolUpdateDirectorSchema } from "../../shared/schemas";
import { LayoutSchoolPage } from "./Layout";

export const DefineDiretPage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { updateAllUser } = useUserContext();
  const { updateSchool, schoolSelect } = useSchoolContext();
  let school_id = "";
  if (id) {
    school_id = id;
  } else if (schoolSelect) school_id = schoolSelect.id;

  return (
    <LayoutSchoolPage title="Definir Diretor" isSchool>
      <FormContainer
        onSuccess={(data) => {
          if (schoolSelect?.director) {
            updateAllUser(
              schoolSelect.director.id,
              {
                is_active: false,
                role: "SERV",
              },
              true
            );
          }
          const back = id ? `/school/${id}` : "/";
          updateSchool(data, school_id, "diretor", back);
        }}
        resolver={zodResolver(schoolUpdateDirectorSchema)}
      >
        <Box
          m={2}
          display="flex"
          flexDirection="column"
          component={Paper}
          variant="outlined"
        >
          <Grid container direction="column" p={2} spacing={2}>
            {schoolSelect?.director && (
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
                    <Typography>Diretor Atual</Typography>
                    <Typography>Nome: {schoolSelect.director.name}</Typography>
                    <Typography>CPF: {schoolSelect.director.cpf}</Typography>
                  </Box>
                </Grid>
              </Grid>
            )}
            <Grid container item direction="row" justifyContent="center">
              <Grid item xs={12} sm={9} md={6} lg={3}>
                <TextFieldElement name="cpf" label="CPF" required fullWidth />
              </Grid>
            </Grid>
            <Grid container item direction="row" justifyContent="center">
              <Grid item xs={12} sm={9} md={6} lg={3}>
                <TextFieldElement
                  name="name_diret"
                  label="Nome"
                  required
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container item direction="row" justifyContent="center">
              <Grid item xs={12} sm={9} md={6} lg={3}>
                <ValidateCPF director school_id={school_id} />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </FormContainer>
    </LayoutSchoolPage>
  );
};
