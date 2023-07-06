import { Box, Grid, Typography } from "@mui/material";
import { Checklist, Group, School } from "@mui/icons-material";
import { useDrawerContext, useSchoolContext } from "../../contexts";
import { GridDashContent } from "./GridDashContent";
import { GridDashOrgan } from "./Organ";
import { CardSchool } from "../card";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/pt-br";
dayjs.extend(localizedFormat);

export const GridDashSchoolAdmin = () => {
  const { schoolAdminRetrieve } = useSchoolContext();
  const { handleClickFrequency } = useDrawerContext();

  return (
    schoolAdminRetrieve && (
      <Grid container item direction="row" xs={12} md={5} spacing={2}>
        <Grid item xs={12}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={2}
          >
            <Typography variant="h6" textAlign="center">
              {dayjs().format("dddd, LL")}
            </Typography>
            <CardSchool school={schoolAdminRetrieve} />
          </Box>
        </Grid>
        <>
          <GridDashContent
            icon={<Group fontSize="large" />}
            quant={schoolAdminRetrieve.students}
            info={schoolAdminRetrieve.students === 1 ? "Aluno" : "Alunos"}
            dest="/school/student"
          />
          <GridDashContent
            icon={<Checklist fontSize="large" />}
            quant={
              schoolAdminRetrieve.frequencies === 0
                ? "-"
                : schoolAdminRetrieve.frequencies
            }
            info={
              schoolAdminRetrieve.frequencies === 1
                ? "Frequência"
                : "Frequências"
            }
            dest="/frequency/list"
            onClick={handleClickFrequency}
          />
          <GridDashContent
            icon={<School fontSize="large" />}
            quant={schoolAdminRetrieve.infrequency.toFixed(0) + "%"}
            info="Infrequência"
            dest="/school/class"
          />
        </>
        <GridDashOrgan />
      </Grid>
    )
  );
};
