import { Box, Card, CardContent, Grid, Paper } from "@mui/material";
import { LayoutBasePage } from "../../shared/layouts";
import {
  CalendarDashCommon,
  GridDashSchoolAdmin,
} from "../../shared/components";
import { useAppThemeContext, useAuthContext } from "../../shared/contexts";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiSchool } from "../../shared/services";
import { TitleSchoolDashAdmin } from "../../shared/components/title/SchoolDashAdmin";
import { iSchoolClass } from "../../shared/interfaces";

export const DashboardSchoolAdmin = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { theme, setLoading } = useAppThemeContext();
  const { schoolData, yearData } = useAuthContext();
  const [schoolClassData, setSchoolClassData] = useState<iSchoolClass>();
  let school_id = "";
  if (id) {
    school_id = id;
  } else if (schoolData) school_id = schoolData.id;

  useEffect(() => {
    if (id && yearData) {
      setLoading(true);
      apiSchool
        .retrieve(id, yearData.id)
        .then((res) => {
          setSchoolClassData(res);
        })
        .catch(() => navigate("/"))
        .finally(() => setLoading(false));
    }
  }, [id, yearData]);

  if (school_id.length === 0) return <Navigate to="/" />;

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
                {schoolClassData && <GridDashSchoolAdmin school={schoolClassData} />}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </LayoutBasePage>
  );
};
