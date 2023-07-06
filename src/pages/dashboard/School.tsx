import { Box, Card, CardContent, Grid, Paper } from "@mui/material";
import { LayoutBasePage } from "../../shared/layouts";
import {
  CalendarDashCommon,
  GridDashSchool,
  TitleSchoolDash,
} from "../../shared/components";
import {
  useAppThemeContext,
  useAuthContext,
  useSchoolContext,
} from "../../shared/contexts";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const DashboardSchoolPage = () => {
  const { school_id } = useParams();
  const { theme } = useAppThemeContext();
  const { yearData } = useAuthContext();
  const { schoolRetrieve, schoolDataRetrieve } = useSchoolContext();

  useEffect(() => {
    if (school_id && yearData) {
      if (schoolRetrieve?.id !== school_id)
        schoolDataRetrieve(school_id, `?year_id=${yearData.id}`);
    }
  }, [school_id, yearData]);

  return (
    <LayoutBasePage title={<TitleSchoolDash />}>
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
