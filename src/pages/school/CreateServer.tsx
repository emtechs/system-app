import { useSearchParams } from "react-router-dom";
import { Box, Grid, Paper } from "@mui/material";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSchoolContext } from "../../shared/contexts";
import { ValidateCPF } from "../../shared/components";
import { serverCreateSchema } from "../../shared/schemas";
import { LayoutSchoolPage } from "./Layout";

export const CreateServerPage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { createServer, schoolSelect } = useSchoolContext();
  let school_id = "";
  if (id) {
    school_id = id;
  } else if (schoolSelect) school_id = schoolSelect.id;

  return (
    <LayoutSchoolPage title="Adicionar Servidor" isSchool>
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
    </LayoutSchoolPage>
  );
};
