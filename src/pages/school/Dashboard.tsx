import { Box, Card, CardContent, Grid, Paper } from "@mui/material";
import { LayoutBasePage } from "../../shared/layouts";
import {
  CalendarDashCommon,
  GridDashSchoolAdmin,
  TitleSchoolDashAdmin,
} from "../../shared/components";
import { useAppThemeContext, useSchoolContext } from "../../shared/contexts";

export const DashboardSchoolAdmin = () => {
  const { theme } = useAppThemeContext();
  const { schoolClassSelect } = useSchoolContext();

  return (
    <LayoutBasePage title={<TitleSchoolDashAdmin />}>
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
                {schoolClassSelect && (
                  <GridDashSchoolAdmin school={schoolClassSelect} />
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </LayoutBasePage>
  );
};
