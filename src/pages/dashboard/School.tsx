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
  GridDashSchool,
  LinkRouter,
} from "../../shared/components";
import { useAppThemeContext } from "../../shared/contexts/ThemeContext";
import { useAuthContext } from "../../shared/contexts";
import { Home, School } from "@mui/icons-material";

export const DashboardSchool = () => {
  const { theme } = useAppThemeContext();
  const { schoolData, setSchoolData } = useAuthContext();

  return (
    <LayoutBasePage
      title={
        <Breadcrumbs aria-label="breadcrumb">
          <LinkRouter
            underline="none"
            color="inherit"
            to="/"
            onClick={() => {
              setSchoolData(undefined);
            }}
          >
            <Chip
              clickable
              color="primary"
              variant="outlined"
              label="Página Inicial"
              icon={<Home sx={{ mr: 0.5 }} fontSize="inherit" />}
            />
          </LinkRouter>
          {schoolData && (
            <Chip
              label={schoolData.name}
              color="primary"
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
                <GridDashSchool />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </LayoutBasePage>
  );
};
