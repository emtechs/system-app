import {
  Box,
  Breadcrumbs,
  Card,
  CardContent,
  Chip,
  Grid,
  Link,
  Paper,
} from "@mui/material";
import { LayoutBasePage } from "../../shared/layouts";
import {
  CalendarDashCommon,
  GridDashSchoolAdmin,
  LabelSchool,
} from "../../shared/components";
import { useAppThemeContext, useSchoolContext } from "../../shared/contexts";
import { Home } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export const DashboardSchoolAdminPage = () => {
  const { school_id } = useParams();
  const { theme } = useAppThemeContext();
  const { schoolAdminRetrieve, schoolDataAdminRetrieve } = useSchoolContext();

  useEffect(() => {
    if (school_id) {
      if (schoolAdminRetrieve?.id !== school_id)
        schoolDataAdminRetrieve(school_id);
    }
  }, [school_id]);

  return (
    <LayoutBasePage
      title={
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="none" color="inherit" href="/home/school">
            <Chip
              clickable
              color="primary"
              variant="outlined"
              label="Página Inicial"
              icon={<Home sx={{ mr: 0.5 }} fontSize="inherit" />}
            />
          </Link>
          <LabelSchool school={schoolAdminRetrieve} />
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
