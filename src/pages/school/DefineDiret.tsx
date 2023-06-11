import { useSchoolContext, useUserContext } from "../../shared/contexts";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { zodResolver } from "@hookform/resolvers/zod";
import { schoolUpdateDirectorSchema } from "../../shared/schemas";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { LayoutBasePage } from "../../shared/layouts";
import {
  SelectSchoolSelectData,
  Tools,
  ValidateCPF,
} from "../../shared/components";

export const DefineDiretPage = () => {
  const { updateAllUser } = useUserContext();
  const { updateSchool, schoolSelect } = useSchoolContext();

  return (
    <LayoutBasePage
      title="Definir Diretor"
      school={<SelectSchoolSelectData />}
      tools={<Tools isHome />}
    >
      <FormContainer
        onSuccess={(data) => {
          if (schoolSelect) {
            if (schoolSelect.director) {
              updateAllUser(
                schoolSelect.director.id,
                {
                  is_active: false,
                  role: "SERV",
                },
                true
              );
            }
            updateSchool(data, schoolSelect.id, "diretor", "/");
          }
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
                <ValidateCPF director school_id={schoolSelect?.id} />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </FormContainer>
    </LayoutBasePage>
  );
};
