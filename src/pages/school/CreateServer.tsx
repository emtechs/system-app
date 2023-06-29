import { useSearchParams } from "react-router-dom";
import { Box, Chip, Grid, Paper } from "@mui/material";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthContext, useSchoolContext } from "../../shared/contexts";
import {
  TitleRetrieveSchoolAdminPages,
  ValidateCPF,
} from "../../shared/components";
import { serverCreateSchema } from "../../shared/schemas";
import { LayoutBasePage } from "../../shared/layouts";
import { PersonAdd } from "@mui/icons-material";
import { useEffect } from "react";

export const CreateServerPage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { schoolData } = useAuthContext();
  const { createServer, schoolRetrieve } = useSchoolContext();
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
              label="Servidor"
              color="primary"
              icon={<PersonAdd sx={{ mr: 0.5 }} fontSize="inherit" />}
            />,
          ]}
        />
      }
    >
      <FormContainer
        onSuccess={(data) => {
          const back = id ? `/school?id=${id}&order=name` : undefined;
          createServer(data, school_id, back);
        }}
        resolver={zodResolver(serverCreateSchema)}
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
                <TextFieldElement name="cpf" label="CPF" required fullWidth />
              </Grid>
            </Grid>
            <Grid container item direction="row" justifyContent="center">
              <Grid item xs={12} sm={9} md={6} lg={3}>
                <TextFieldElement name="name" label="Nome" required fullWidth />
              </Grid>
            </Grid>
            <Grid container item direction="row" justifyContent="center">
              <Grid item xs={12} sm={9} md={6} lg={3}>
                <ValidateCPF school_id={school_id} />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </FormContainer>
    </LayoutBasePage>
  );
};
