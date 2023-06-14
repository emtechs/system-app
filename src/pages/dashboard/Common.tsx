import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { LayoutBasePage } from "../../shared/layouts";
import { ReactNode, useEffect, useState } from "react";
import {
  useAuthContext,
  useCalendarContext,
  useDrawerContext,
} from "../../shared/contexts";
import { CalendarDashCommon, SelectSchoolData } from "../../shared/components";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/pt-br";
import { useAppThemeContext } from "../../shared/contexts/ThemeContext";
import { apiUsingNow } from "../../shared/services";
import { iDashSchoolServer } from "../../shared/interfaces";
import { Link } from "react-router-dom";
import { Checklist, EventBusy, School } from "@mui/icons-material";
dayjs.extend(localizedFormat);

interface iGridDashContentProps {
  icon: ReactNode;
  quant: number | string;
  info: string;
  dest: string;
  onClick?: () => void;
}

const GridDashContent = ({
  icon,
  quant,
  info,
  dest,
  onClick,
}: iGridDashContentProps) => {
  const theme = useTheme();

  return (
    <Grid item xs={4}>
      <Card>
        <Link to={dest}>
          <CardActionArea onClick={onClick}>
            <CardContent>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={0.5}
              >
                {icon}
                <Typography sx={{ fontSize: theme.spacing(4) }}>
                  {quant}
                </Typography>
                <Typography
                  component="div"
                  display="flex"
                  textAlign="center"
                  alignItems="center"
                  height={30}
                  fontSize={theme.spacing(1.6)}
                >
                  {info}
                </Typography>
              </Box>
            </CardContent>
          </CardActionArea>
        </Link>
      </Card>
    </Grid>
  );
};

export const DashboardCommon = () => {
  const { theme, setLoading } = useAppThemeContext();
  const { schoolData, yearData } = useAuthContext();
  const { dateDisplay, dateData, setDateDisplay, setDateData } =
    useCalendarContext();
  const { handleClickFrequency, handleClickSchool } = useDrawerContext();
  const [infoSchool, setInfoSchool] = useState<iDashSchoolServer>();

  useEffect(() => {
    setDateData(dayjs().format("DD/MM/YYYY"));
    setDateDisplay(dayjs().format("dddd, LL"));
  }, []);

  useEffect(() => {
    if (schoolData && yearData) {
      setLoading(true);
      apiUsingNow
        .get<iDashSchoolServer>(
          `schools/${schoolData.school.id}/dash/server?date=${dateData}&year_id=${yearData.id}`
        )
        .then((res) => setInfoSchool(res.data))
        .finally(() => setLoading(false));
    }
  }, [dateData, schoolData, yearData]);

  return (
    <LayoutBasePage title="Página Inicial">
      <Box
        my={1}
        mx={2}
        flexDirection="column"
        component={Paper}
        variant="outlined"
      >
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
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography variant="subtitle1">{dateDisplay}</Typography>
                      <Button
                        size="small"
                        variant="contained"
                        disableElevation
                        disabled={dateDisplay === dayjs().format("dddd, LL")}
                        onClick={() => {
                          setDateData(dayjs().format("DD/MM/YYYY"));
                          setDateDisplay(dayjs().format("dddd, LL"));
                        }}
                      >
                        hoje
                      </Button>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <SelectSchoolData />
                  </Grid>
                  {infoSchool && (
                    <>
                      <GridDashContent
                        icon={<Checklist fontSize="large" />}
                        quant={`${infoSchool.frequencies}/${infoSchool.classTotal}`}
                        info="Frequências no dia"
                        dest={
                          infoSchool.frequencies === infoSchool.classTotal
                            ? "/frequency/list?date=" + dateData
                            : "frequency?date=" + dateData + "&order=name"
                        }
                        onClick={handleClickFrequency}
                      />
                      <GridDashContent
                        icon={<EventBusy fontSize="large" />}
                        quant={infoSchool.frequencyOpen}
                        info="Frequências em aberto"
                        dest={
                          infoSchool.frequencyOpen !== 0
                            ? "/frequency/open"
                            : infoSchool.frequencies === infoSchool.classTotal
                            ? "/frequency/list"
                            : "frequency?date=" + dateData + "&order=name"
                        }
                        onClick={handleClickFrequency}
                      />
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
