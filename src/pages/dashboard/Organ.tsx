import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { LayoutBasePage } from "../../shared/layouts";
import { useEffect, useState } from "react";
import { apiUsingNow } from "../../shared/services";
import { useAppThemeContext } from "../../shared/contexts";
import { iSchoolDash } from "../../shared/interfaces";

interface iSchoolDashProps {
  school: iSchoolDash;
}

const SchoolDash = ({ school }: iSchoolDashProps) => {
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card>
        <CardContent>
          <Typography
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipses"
            gutterBottom
          >
            {school.name}
          </Typography>
          <Typography gutterBottom>{school.total_students} Alunos</Typography>
          <Typography gutterBottom>
            {String(school.school_infreq).replace(".", ",")}% de Infrequência
          </Typography>
          <Typography>{school.classes[0].class.name}</Typography>
          <Typography>{school.classes[0]._count.students} Alunos</Typography>
          <Typography>
            {String(school.classes[0].class_infreq).replace(".", ",")}% de
            Infrequência
          </Typography>
          {school.director && (
            <>
              <Typography>{school.director.name}</Typography>
              <Typography>{school.director.cpf}</Typography>
            </>
          )}
        </CardContent>
        <CardActions>
          <Button size="small">Saber Mais</Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export const DashboardAdmin = () => {
  const theme = useTheme();
  const mdLgBetween = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const { setLoading } = useAppThemeContext();
  const [listSchoolData, setListSchoolData] = useState<iSchoolDash[]>();

  useEffect(() => {
    let take = 1;
    if (mdLgBetween) {
      take = 2;
    } else if (mdUp) {
      take = 3;
    }
    setLoading(true);
    apiUsingNow
      .get<iSchoolDash[]>(`schools?is_dash=true&take=${take}`)
      .then((res) => {
        setListSchoolData(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <LayoutBasePage title="Página Inicial">
      <Box
        mx={2}
        display="flex"
        flexDirection="column"
        component={Paper}
        variant="outlined"
      >
        <Card>
          <CardContent>
            <Grid container direction="column" p={2} spacing={2}>
              <Typography variant="h6">Alerta Escolas</Typography>
              <Grid
                container
                item
                direction="row"
                justifyContent="center"
                spacing={2}
              >
                {listSchoolData &&
                  listSchoolData.map((el) => (
                    <SchoolDash key={el.id} school={el} />
                  ))}
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button>Saber Mais</Button>
          </CardActions>
        </Card>
      </Box>
    </LayoutBasePage>
  );
};
