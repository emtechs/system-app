import {
  useAppThemeContext,
  useAuthContext,
  useCalendarContext,
  useClassContext,
  useDrawerContext,
} from "../../../shared/contexts";
import {
  Box,
  Breadcrumbs,
  Card,
  CardContent,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { LayoutBasePage } from "../../../shared/layouts";
import {
  CalendarFrequency,
  GridDashContent,
  LinkRouter,
  SelectSchoolClass,
} from "../../../shared/components";
import { iDashClass } from "../../../shared/interfaces";
import { useEffect, useState } from "react";
import {
  AddBox,
  Checklist,
  EventBusy,
  Groups,
  School,
  Workspaces,
} from "@mui/icons-material";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/pt-br";
import { apiUsingNow } from "../../../shared/services";
import { Navigate } from "react-router-dom";
dayjs.extend(localizedFormat);

export const CreateFrequencyCommon = () => {
  const { theme, setLoading } = useAppThemeContext();
  const { yearData, schoolData } = useAuthContext();
  const { handleClickSchool, handleClickButtonTools } = useDrawerContext();
  const { monthData } = useCalendarContext();
  const { classWithSchoolSelect, setClassWithSchoolSelect } = useClassContext();
  const [infoClass, setInfoClass] = useState<iDashClass>();

  useEffect(() => {
    if (yearData && schoolData && classWithSchoolSelect && monthData) {
      const query = `?month=${monthData}`;
      setLoading(true);
      apiUsingNow
        .get<iDashClass>(
          `classes/${classWithSchoolSelect.class.id}/${schoolData.id}/${yearData.id}/dash${query}`
        )
        .then((res) => setInfoClass(res.data))
        .finally(() => setLoading(false));
    }
  }, [classWithSchoolSelect, schoolData, monthData, yearData]);

  if (!schoolData) {
    return <Navigate to="/" />;
  }

  return (
    <LayoutBasePage title="Nova Frequência">
      <Box my={1} mx={2} component={Paper} variant="outlined">
        <Box mx={2} my={1}>
          <Breadcrumbs aria-label="breadcrumb">
            <LinkRouter
              underline="hover"
              sx={{ display: "flex", alignItems: "center" }}
              color="inherit"
              to="/"
              onClick={handleClickButtonTools}
            >
              <School sx={{ mr: 0.5 }} fontSize="inherit" />
              {schoolData?.name}
            </LinkRouter>
            {classWithSchoolSelect && (
              <LinkRouter
                underline="hover"
                sx={{ display: "flex", alignItems: "center" }}
                color="inherit"
                to="/frequency/create"
                onClick={() => {
                  setClassWithSchoolSelect(undefined);
                }}
              >
                <Workspaces sx={{ mr: 0.5 }} fontSize="inherit" />
                {classWithSchoolSelect.class.name}
              </LinkRouter>
            )}
            <Typography
              sx={{ display: "flex", alignItems: "center" }}
              color="text.primary"
            >
              <AddBox sx={{ mr: 0.5 }} fontSize="inherit" />
              Frequência
            </Typography>
          </Breadcrumbs>
        </Box>
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
                    <CalendarFrequency />
                  </Box>
                </Grid>
                <Grid container item direction="row" xs={12} md={5} spacing={2}>
                  <Grid item xs={12}>
                    <SelectSchoolClass />
                  </Grid>
                  {infoClass && (
                    <>
                      <GridDashContent
                        icon={<Checklist fontSize="large" />}
                        quant={`${infoClass.frequencies}`}
                        info="Frequências no mês"
                        dest={"/"}
                      />
                      {infoClass.frequencyOpen !== 0 ? (
                        <GridDashContent
                          icon={<EventBusy fontSize="large" />}
                          quant={infoClass.frequencyOpen}
                          info="Frequências em aberto"
                          dest={
                            infoClass.frequencyOpen !== 0
                              ? "/frequency/open"
                              : "/frequency/list"
                          }
                        />
                      ) : (
                        <GridDashContent
                          icon={<Groups fontSize="large" />}
                          quant={infoClass.stundents}
                          info="Alunos"
                          dest="/school/student"
                          onClick={handleClickSchool}
                        />
                      )}
                      <GridDashContent
                        icon={<Workspaces fontSize="large" />}
                        quant={
                          infoClass?.class_infreq
                            ? infoClass.class_infreq.toFixed(0) + "%"
                            : "0%"
                        }
                        info="Infrequência"
                        dest="/school/class"
                        onClick={handleClickSchool}
                      />
                    </>
                  )}
                  <Grid item xs={12}>
                    <Card>
                      <CardContent>
                        <Box
                          display="flex"
                          justifyContent="space-evenly"
                          alignItems="center"
                          gap={1}
                        >
                          <img width="50%" src="/pref_massape.png" />
                          <img width="25%" src="/emtechs.jpg" />
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </LayoutBasePage>
  );
};
