import { ReactNode, useEffect, useState } from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
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
} from "../../../shared/contexts";
import { Link } from "react-router-dom";
import { iUserDash } from "../../../shared/interfaces";
import { apiUsingNow } from "../../../shared/services";

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

export const GridDash = () => {
  const { setLoading } = useAppThemeContext();
  const { yearId } = useAuthContext();
  const {
    handleClickSchool,
    handleClickClass,
    handleClickStudent,
    handleClickFrequency,
    handleClickUser,
  } = useDrawerContext();
  const [userDashData, setUserDashData] = useState<iUserDash>();

  useEffect(() => {
    if (yearId) {
      setLoading(true);
      apiUsingNow
        .get<iUserDash>(`users/dash/${yearId}`)
        .then((res) => setUserDashData(res.data))
        .finally(() => setLoading(false));
    }
  }, [yearId]);

  return (
    <>
      {userDashData && (
        <Grid container item direction="row" xs={12} md={5} spacing={2}>
          <GridDashContent
            icon={<School fontSize="large" />}
            quant={userDashData.countSchool}
            info="Escolas"
            dest="/school/list?order=name"
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
