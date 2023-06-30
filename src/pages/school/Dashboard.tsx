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
  LinkRouter,
} from "../../shared/components";
import {
  useAppThemeContext,
  useAuthContext,
  useDrawerContext,
  useSchoolContext,
} from "../../shared/contexts";
import { Home, School } from "@mui/icons-material";

export const DashboardSchoolAdmin = () => {
  const { theme } = useAppThemeContext();
  const { schoolDataAdmin } = useAuthContext();
  const { labelSchoolDataAdmin } = useSchoolContext();
  const { handleClickButtonTools } = useDrawerContext();

  return (
    <LayoutBasePage
      title={
        <Breadcrumbs aria-label="breadcrumb">
          <LinkRouter
            underline="none"
            color="inherit"
            to="/home/school"
            onClick={handleClickButtonTools}
          >
            <Chip
              clickable
              color="primary"
              variant="outlined"
              label="Página Inicial"
              icon={<Home sx={{ mr: 0.5 }} fontSize="inherit" />}
            />
          </LinkRouter>
          {schoolDataAdmin && (
            <Chip
              color="primary"
              variant="filled"
              label={labelSchoolDataAdmin()}
              icon={<School sx={{ mr: 0.5 }} fontSize="inherit" />}
            />
          )}
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
