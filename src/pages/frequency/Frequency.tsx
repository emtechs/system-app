import {
  Box,
  Breadcrumbs,
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
} from "../../shared/contexts";
import {
  GridDashContent,
  LinkRouter,
  Pagination,
  SelectDate,
  TableBase,
  ValidateFrequency,
} from "../../shared/components";
import { useAppThemeContext } from "../../shared/contexts/ThemeContext";
import { apiClass, apiUsingNow } from "../../shared/services";
import {
  iClassDash,
  iClassDashSelect,
  iDashSchoolServer,
  iheadCell,
} from "../../shared/interfaces";
import {
  EventAvailable,
  EventBusy,
  Groups,
  School,
  Workspaces,
} from "@mui/icons-material";
import { Navigate } from "react-router-dom";
import { defineBgColorInfrequency } from "../../shared/scripts";
import { AutocompleteElement, FormContainer } from "react-hook-form-mui";

interface iCardClassDashProps {
  classDash: iClassDash;
  date: string;
  date_time: string;
  name: string;
}
const CardClassDash = ({
  classDash,
  date,
  date_time,
  name,
}: iCardClassDashProps) => {
  const { theme, mdDown } = useAppThemeContext();
  const { createFrequency } = useFrequencyContext();
  const students = classDash.students.map(({ student }) => {
    return { student_id: student.id };
  });
  return (
    <TableRow
      hover
      sx={{ cursor: "pointer" }}
      onClick={() => {
        createFrequency({
          date,
          date_time,
          name,
          class_id: classDash.class.id,
          school_id: classDash.school.id,
          year_id: classDash.year.id,
          students,
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
        {String(classDash.infrequency).replace(".", ",")}%
      </TableCell>
    </TableRow>
  );
};

export const FrequencyPage = () => {
  const { setLoading, mdDown } = useAppThemeContext();
  const { yearData, schoolData } = useAuthContext();
  const { dateData, monthData } = useCalendarContext();
  const { handleClickButtonTools, handleClickSchool } = useDrawerContext();
  const { setSteps, setTotal, setIsLoading, defineQuery, query } =
    usePaginationContext();
  const [infoSchool, setInfoSchool] = useState<iDashSchoolServer>();
  const [listClassData, setListClassData] = useState<iClassDash[]>();
  const [listClassSelect, setListClassSelect] = useState<iClassDashSelect[]>();

  const headCells: iheadCell[] = mdDown
    ? [
        { order: "name", numeric: false, label: "Turma" },
        { order: "infreq", numeric: true, label: "Infrequência" },
      ]
    : [
        { order: "name", numeric: false, label: "Turma" },
        { numeric: true, label: "Alunos" },
        { numeric: true, label: "Frequências" },
        { order: "infreq", numeric: true, label: "Infrequência" },
      ];

  const date = useCallback(() => {
    return dateData.format("DD/MM/YYYY");
  }, [dateData]);

  useEffect(() => {
    if (schoolData) {
      const take = 4;
      let queryData = query(take, date());
      queryData += "&is_dash=true";
      setIsLoading(true);
      apiClass
        .listDash(schoolData.id, queryData)
        .then((res) => {
          setTotal(res.total);
          setListClassData(res.result);
          setListClassSelect(res.classes);
          const arredSteps = Math.ceil(res.total / take);
          setSteps(arredSteps === 1 ? 0 : arredSteps);
        })
        .finally(() => setIsLoading(false));
    }
  }, [date, schoolData, query]);

  useEffect(() => {
    if (schoolData && yearData) {
      const query = defineQuery(yearData.id, undefined, undefined, date());
      setLoading(true);
      apiUsingNow
        .get<iDashSchoolServer>(`schools/${schoolData.id}/dash/server${query}`)
        .then((res) => setInfoSchool(res.data))
        .finally(() => setLoading(false));
    }
  }, [date, schoolData, yearData, defineQuery]);

  if (!schoolData) return <Navigate to="/" />;

  return (
    <LayoutBasePage
      title={
        <Breadcrumbs aria-label="breadcrumb">
          <LinkRouter
            underline="none"
            color="inherit"
            to="/"
            onClick={handleClickButtonTools}
          >
            <Chip
              clickable
              color="primary"
              variant="outlined"
              label={schoolData.name}
              icon={<School sx={{ mr: 0.5 }} fontSize="inherit" />}
            />
          </LinkRouter>
          <Chip
            label="Frequência"
            color="primary"
            icon={<EventAvailable sx={{ mr: 0.5 }} fontSize="inherit" />}
          />
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
                  <Box>
                    <FormContainer>
                      <AutocompleteElement
                        name="class"
                        label="Turma"
                        loading={!listClassSelect}
                        options={
                          listClassSelect && listClassSelect.length > 0
                            ? listClassSelect
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
                    is_body={false}
                    is_pagination={false}
                    headCells={headCells}
                  >
                    {listClassData?.map((el) => (
                      <CardClassDash
                        key={el.class.id}
                        classDash={el}
                        date={date()}
                        date_time={dateData.format("YYYY-MM-DD")}
                        name={monthData}
                      />
                    ))}
                  </TableBase>
                  <Pagination />
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
