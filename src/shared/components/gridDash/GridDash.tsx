import { useEffect, useState } from "react";
import { Box, Card, CardContent, Grid } from "@mui/material";
import {
  Checklist,
  Close,
  Groups,
  People,
  School,
  Workspaces,
} from "@mui/icons-material";
import {
  useAppThemeContext,
  useAuthContext,
  useDrawerContext,
} from "../../contexts";
import { iUserDash } from "../../interfaces";
import { apiUsingNow } from "../../services";
import { GridDashContent } from "./GridDashContent";

export const GridDash = () => {
  const { setLoading } = useAppThemeContext();
  const { yearData } = useAuthContext();
  const {
    handleClickSchool,
    handleClickClass,
    handleClickStudent,
    handleClickFrequency,
    handleClickUser,
  } = useDrawerContext();
  const [userDashData, setUserDashData] = useState<iUserDash>();

  useEffect(() => {
    if (yearData) {
      setLoading(true);
      apiUsingNow
        .get<iUserDash>(`users/dash/${yearData.id}`)
        .then((res) => setUserDashData(res.data))
        .finally(() => setLoading(false));
    }
  }, [yearData]);

  return (
    <>
      {userDashData && (
        <Grid container item direction="row" xs={12} md={5} spacing={2}>
          <GridDashContent
            icon={<School fontSize="large" />}
            quant={userDashData.countSchool}
            info="Escolas"
            dest="/school/list"
            onClick={handleClickSchool}
          />
          <GridDashContent
            icon={<Workspaces fontSize="large" />}
            quant={userDashData.countClass}
            info="Turmas"
            dest="/class/list"
            onClick={handleClickClass}
          />
          <GridDashContent
            icon={<Groups fontSize="large" />}
            quant={userDashData.countStudent}
            info="Alunos"
            dest="/student/list"
            onClick={handleClickStudent}
          />
          <GridDashContent
            icon={<Checklist fontSize="large" />}
            quant={userDashData.countFrequency}
            info="Frequências"
            dest="/frequency/list"
            onClick={handleClickFrequency}
          />
          <GridDashContent
            icon={<People fontSize="large" />}
            quant={userDashData.countServer}
            info="Servidores"
            dest="/user/list?role=SERV&order=name"
            onClick={handleClickUser}
          />
          <GridDashContent
            icon={<Close fontSize="large" />}
            quant={userDashData.countNotClass}
            info="Não enturmados"
            dest="/"
            onClick={handleClickStudent}
          />
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
      )}
    </>
  );
};
