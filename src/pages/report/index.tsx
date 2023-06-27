import {
  Box,
  Breadcrumbs,
  Card,
  CardContent,
  Chip,
  Grid,
  Paper,
} from "@mui/material";
import { LayoutBasePage } from "../../shared/layouts";
import { useAuthContext, useDrawerContext } from "../../shared/contexts";
import { LinkRouter } from "../../shared/components";
import { School, Summarize } from "@mui/icons-material";
import { Navigate } from "react-router-dom";
import { FormContainer } from "react-hook-form-mui";

export const ReportPage = () => {
  const { schoolData } = useAuthContext();
  const { handleClickButtonTools } = useDrawerContext();

  if (!schoolData) return <Navigate to="/" />;

  return (
    <LayoutBasePage
      title={
        <Breadcrumbs aria-label="breadcrumb">
          <LinkRouter
            underline="none"
            color="inherit"
            to="/"
            onClick={handleClickButtonTools}
          >
            <Chip
              clickable
              color="primary"
              variant="outlined"
              label={schoolData.name}
              icon={<School sx={{ mr: 0.5 }} fontSize="inherit" />}
            />
          </LinkRouter>
          <Chip
            label="Relatório"
            color="primary"
            icon={<Summarize sx={{ mr: 0.5 }} fontSize="inherit" />}
          />
        </Breadcrumbs>
      }
    >
      <Box my={1} mx={2} component={Paper} variant="outlined">
        <FormContainer>
          <Card>
            <CardContent>
              <Grid container direction="column" p={2} spacing={2}>
                <Grid container item direction="row" justifyContent="center">
                  <Grid item xs={12} sm={9} md={6} lg={3}></Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </FormContainer>
      </Box>
    </LayoutBasePage>
  );
};
