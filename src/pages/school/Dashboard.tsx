import { Box, Card, CardContent, Grid, Paper } from "@mui/material";
import { LayoutBasePage } from "../../shared/layouts";
import {
  CalendarDashCommon,
  GridDashSchool,
  TitleSchoolDashPage,
} from "../../shared/components";
import { useAppThemeContext } from "../../shared/contexts";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useVerifySchool } from "../../shared/hooks";

export const DashboardSchoolPage = () => {
  const { school_id } = useParams();
  const { theme } = useAppThemeContext();
  const { verifySchool } = useVerifySchool();

  useEffect(() => {
    if (school_id) verifySchool(school_id);
  }, [school_id]);

  return (
    <LayoutBasePage title={<TitleSchoolDashPage />}>
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
