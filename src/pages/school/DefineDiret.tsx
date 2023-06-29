import { useSearchParams } from "react-router-dom";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Chip, Grid, Paper, Typography } from "@mui/material";
import {
  useAuthContext,
  useSchoolContext,
  useUserContext,
} from "../../shared/contexts";
import {
  TitleRetrieveSchoolAdminPages,
  ValidateCPF,
} from "../../shared/components";
import { schoolUpdateDirectorSchema } from "../../shared/schemas";
import { LayoutBasePage } from "../../shared/layouts";
import { useEffect } from "react";
import { Person } from "@mui/icons-material";

export const DefineDiretPage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { schoolData } = useAuthContext();
  const { updateAllUser } = useUserContext();
  const { updateSchool, schoolRetrieve } = useSchoolContext();
  let school_id = "";
  if (id) {
    school_id = id;
  } else if (schoolData) school_id = schoolData.id;

  useEffect(() => {
    if (id) schoolRetrieve(id);
  }, [id]);

  return (
    <LayoutBasePage
      title={
        <TitleRetrieveSchoolAdminPages
          breadcrumbs={[
            <Chip
              label="Diretor"
              color="primary"
              icon={<Person sx={{ mr: 0.5 }} fontSize="inherit" />}
            />,
          ]}
        />
      }
    >
      <FormContainer
        onSuccess={(data) => {
          if (schoolData?.director) {
            updateAllUser(
              schoolData.director.id,
              {
                is_active: false,
                role: "SERV",
              },
              true
            );
          }
          const back = id ? `/school?id=${id}` : "/school/list";
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
            {schoolData && (
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
                  {schoolData.director && (
                    <Box>
                      <Typography>Diretor Atual</Typography>
                      <Typography>Nome: {schoolData.director.name}</Typography>
                      <Typography>CPF: {schoolData.director.cpf}</Typography>
                    </Box>
                  )}
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
    </LayoutBasePage>
  );
};
