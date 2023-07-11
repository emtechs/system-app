import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Paper,
  TableCell,
  TableRow,
} from "@mui/material";
import { LayoutBasePage } from "../../shared/layouts";
import { useCallback, useEffect, useState } from "react";
import {
  useAuthContext,
  useCalendarContext,
  useDrawerContext,
  useFrequencyContext,
  usePaginationContext,
  useSchoolContext,
} from "../../shared/contexts";
import {
  GridDashContent,
  SelectDate,
  TableBase,
  ValidateFrequency,
} from "../../shared/components";
import { useAppThemeContext } from "../../shared/contexts/ThemeContext";
import { apiClass, apiUsingNow } from "../../shared/services";
import { iClassDash, iDashSchool, iheadCell } from "../../shared/interfaces";
import {
  EventAvailable,
  EventBusy,
  Groups,
  Workspaces,
} from "@mui/icons-material";
import { Navigate } from "react-router-dom";
import { AutocompleteElement, FormContainer } from "react-hook-form-mui";
import { defineBgColorInfrequency } from "../../shared/scripts";

interface iCardClassDashProps {
  classDash: iClassDash;
  date: string;
  name: string;
}

const CardClassDash = ({ classDash, date, name }: iCardClassDashProps) => {
  const { mdDown, theme } = useAppThemeContext();
  const { createFrequency } = useFrequencyContext();
  return (
    <TableRow
      hover
      sx={{ cursor: "pointer" }}
      onClick={() => {
        createFrequency({
          date,
          name,
          class_id: classDash.class.id,
          school_id: classDash.school_id,
          year_id: classDash.year_id,
          students: classDash.students,
        });
      }}
    >
      <TableCell>{classDash.class.name}</TableCell>
      {!mdDown && (
        <>
          <TableCell align="right">{classDash._count.students}</TableCell>
          <TableCell align="right">{classDash._count.frequencies}</TableCell>
        </>
      )}
      <TableCell
        align="right"
        sx={{
          color: "#fff",
          bgcolor: defineBgColorInfrequency(classDash.infrequency, theme),
        }}
      >
        {classDash.infrequency.toFixed(0)}%
      </TableCell>
    </TableRow>
  );
};

export const FrequencyPage = () => {
  const { setLoading, mdDown } = useAppThemeContext();
  const { yearData } = useAuthContext();
  const { schoolRetrieve } = useSchoolContext();
  const { dateData, monthData } = useCalendarContext();
  const { handleClickSchool } = useDrawerContext();
  const { setIsLoading, query } = usePaginationContext();
  const [infoSchool, setInfoSchool] = useState<iDashSchool>();
  const [listClassData, setListClassData] = useState<iClassDash[]>();
  const [listClassSelectData, setListClassSelectData] =
    useState<iClassDash[]>();

  const headCells: iheadCell[] = mdDown
    ? [
        { order: "name", numeric: "left", label: "Turma" },
        { order: "infreq", numeric: "right", label: "Infrequência" },
      ]
    : [
        { order: "name", numeric: "left", label: "Turma" },
        { numeric: "right", label: "Alunos" },
        { numeric: "right", label: "Frequências" },
        { order: "infreq", numeric: "right", label: "Infrequência" },
      ];

  const date = useCallback(() => {
    return dateData.format("DD/MM/YYYY");
  }, [dateData]);

  useEffect(() => {
    if (schoolRetrieve && yearData) {
      const queryData = query(undefined, undefined, undefined, date());
      setIsLoading(true);
      apiClass
        .listDash(schoolRetrieve.id, yearData.id, queryData)
        .then((res) => {
          setListClassSelectData(res.classes);
          setListClassData(res.result);
        })
        .finally(() => setIsLoading(false));
    }
  }, [date, schoolRetrieve, yearData, query]);

  useEffect(() => {
    if (schoolRetrieve && yearData) {
      const queryData = query(undefined, undefined, undefined, date());
      setLoading(true);
      apiUsingNow
        .get<iDashSchool>(
          `schools/${schoolRetrieve.id}/dash/${yearData.id}${queryData}`
        )
        .then((res) => setInfoSchool(res.data))
        .finally(() => setLoading(false));
    }
  }, [date, schoolRetrieve, yearData]);

  if (!schoolRetrieve) return <Navigate to="/" />;

  return (
    <LayoutBasePage
      title={
        <Chip
          label="Frequência"
          color="primary"
          icon={<EventAvailable sx={{ mr: 0.5 }} fontSize="inherit" />}
        />
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
                  <Box>
                    <FormContainer>
                      <AutocompleteElement
                        name="class"
                        label="Turma"
                        loading={!listClassSelectData}
                        options={
                          listClassSelectData && listClassSelectData.length > 0
                            ? listClassSelectData
                            : [
                                {
                                  id: 1,
                                  label:
                                    "Todas as frequências do dia já foram registradas.",
                                },
                              ]
                        }
                        textFieldProps={{ fullWidth: true }}
                      />
                      <ValidateFrequency />
                    </FormContainer>
                  </Box>
                  <TableBase
                    message="Todas as frequências do dia já foram registradas."
                    headCells={headCells}
                  >
                    {listClassData?.map((el) => (
                      <CardClassDash
                        key={el.class.id}
                        classDash={el}
                        date={date()}
                        name={monthData}
                      />
                    ))}
                  </TableBase>
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
                      <SelectDate />
                    </Box>
                  </Grid>

                  {infoSchool && (
                    <>
                      <GridDashContent
                        icon={<Workspaces fontSize="large" />}
                        quant={infoSchool.classTotal}
                        info={infoSchool.classTotal === 1 ? "Turma" : "Turmas"}
                        dest="/school/class"
                        onClick={handleClickSchool}
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
                        icon={<EventBusy fontSize="large" />}
                        quant={
                          infoSchool?.day_infreq
                            ? infoSchool.day_infreq.toFixed(0) + "%"
                            : "0%"
                        }
                        info="Infrequência do dia"
                        dest={
                          "/frequency/list?date=" +
                          dateData.format("DD/MM/YYYY")
                        }
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
