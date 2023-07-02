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
import {
  CalendarDashCommon,
  GridDashSchoolAdmin,
  LabelSchool,
  LinkRouter,
} from "../../shared/components";
import { useAppThemeContext, useAuthContext } from "../../shared/contexts";
import { Home } from "@mui/icons-material";

export const SchoolPage = () => {
  const { theme } = useAppThemeContext();
  const { schoolDataAdmin, setSchoolDataAdmin } = useAuthContext();

  return (
    <LayoutBasePage
      title={
        <Breadcrumbs aria-label="breadcrumb">
          <LinkRouter
            underline="none"
            color="inherit"
            to="/home/school"
            onClick={() => setSchoolDataAdmin(undefined)}
          >
            <Chip
              clickable={schoolDataAdmin ? true : undefined}
              color="primary"
              variant={schoolDataAdmin ? "outlined" : "filled"}
              label="Página Inicial"
              icon={<Home sx={{ mr: 0.5 }} fontSize="inherit" />}
            />
          </LinkRouter>
          <LabelSchool school={schoolDataAdmin} />
        </Breadcrumbs>
      }
    >
      <Box my={1} mx={2} component={Paper} variant="outlined">
        <Card>
          <CardContent>
            <Grid container direction="column" p={2} spacing={2}>
              <Grid
                container
                item
                direction="row"
                justifyContent="center"
                spacing={2}
              >
                <Grid item xs={12} md={7}>
                  <Box
                    fontFamily={theme.typography.fontFamily}
                    width="100%"
                    display="flex"
                    flexDirection="column"
                    gap={1}
                  >
                    <CalendarDashCommon />
                  </Box>
                </Grid>
                <GridDashSchoolAdmin />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </LayoutBasePage>
  );
};
