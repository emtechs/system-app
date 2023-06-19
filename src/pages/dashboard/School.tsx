import { Box, Card, CardContent, Grid, Paper, Typography } from "@mui/material";
import { LayoutBasePage } from "../../shared/layouts";
import { useEffect, useState } from "react";
import {
  useAuthContext,
  useCalendarContext,
  useDrawerContext,
  usePaginationContext,
} from "../../shared/contexts";
import {
  CalendarDashCommon,
  GridDashContent,
  SelectSchool,
} from "../../shared/components";
import { useAppThemeContext } from "../../shared/contexts/ThemeContext";
import { apiUsingNow } from "../../shared/services";
import { iDashSchoolServer } from "../../shared/interfaces";
import { Checklist, EventBusy, Groups, School } from "@mui/icons-material";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/pt-br";
dayjs.extend(localizedFormat);

export const DashboardSchool = () => {
  const { theme, setLoading } = useAppThemeContext();
  const { yearData, schoolData } = useAuthContext();
  const { handleClickFrequency, handleClickSchool } = useDrawerContext();
  const { setDateData } = useCalendarContext();
  const { defineQuery } = usePaginationContext();
  const [infoSchool, setInfoSchool] = useState<iDashSchoolServer>();

  useEffect(() => {
    if (schoolData && yearData) {
      const date = dayjs().format("DD/MM/YYYY");
      const query = defineQuery(yearData.id, undefined, undefined, date);
      setLoading(true);
      apiUsingNow
        .get<iDashSchoolServer>(`schools/${schoolData.id}/dash/server${query}`)
        .then((res) => setInfoSchool(res.data))
        .finally(() => setLoading(false));
    }
  }, [schoolData, yearData, defineQuery]);

  return (
    <LayoutBasePage title="Página Inicial">
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
                <Grid container item direction="row" xs={12} md={5} spacing={2}>
                  <Grid item xs={12}>
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                      gap={2}
                    >
                      <Typography variant="h6">
                        {dayjs().format("dddd, LL")}
                      </Typography>
                      <SelectSchool />
                    </Box>
                  </Grid>

                  {infoSchool && (
                    <>
                      <GridDashContent
                        icon={<Checklist fontSize="large" />}
                        quant={`${infoSchool.frequencies}/${infoSchool.classTotal}`}
                        info="Frequências no dia"
                        dest={
                          infoSchool.frequencies === infoSchool.classTotal
                            ? "/frequency/list?date=" +
                              dayjs().format("DD/MM/YYYY")
                            : "/frequency"
                        }
                        onClick={() => {
                          setDateData(dayjs());
                          handleClickFrequency();
                        }}
                      />
                      {infoSchool.frequencyOpen !== 0 ? (
                        <GridDashContent
                          icon={<EventBusy fontSize="large" />}
                          quant={infoSchool.frequencyOpen}
                          info={
                            infoSchool.frequencyOpen === 1
                              ? "Frequência em aberto"
                              : "Frequências em aberto"
                          }
                          dest="/frequency/open"
                          onClick={handleClickFrequency}
                        />
                      ) : (
                        <GridDashContent
                          icon={<Groups fontSize="large" />}
                          quant={infoSchool.stundents}
                          info={infoSchool.stundents === 1 ? "Aluno" : "Alunos"}
                          dest="/school/student"
                          onClick={handleClickSchool}
                        />
                      )}
                      <GridDashContent
                        icon={<School fontSize="large" />}
                        quant={
                          infoSchool?.school_infreq
                            ? infoSchool.school_infreq.toFixed(0) + "%"
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
