import { useAuthContext, useSchoolContext } from "../../shared/contexts";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { zodResolver } from "@hookform/resolvers/zod";
import { schoolUpdateSchema } from "../../shared/schemas";
import { Box, Button, Chip, Grid, Paper, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { LayoutBasePage } from "../../shared/layouts";
import { TitleRetrieveSchoolAdminPages } from "../../shared/components";
import { Edit } from "@mui/icons-material";
import { useEffect } from "react";

export const EditSchoolPage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { schoolData } = useAuthContext();
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
              label="Editar"
              color="primary"
              icon={<Edit sx={{ mr: 0.5 }} fontSize="inherit" />}
            />,
          ]}
        />
      }
    >
      <FormContainer
        onSuccess={(data) => {
          const back = id ? `/school?id=${id}&order=name` : "/";
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
                  <Box>
                    <Typography>Informações Atuais</Typography>
                    <Typography>Nome da Escola: {schoolData.name}</Typography>
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
    </LayoutBasePage>
  );
};
