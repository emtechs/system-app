import { Box, Grid, Typography } from "@mui/material";
import { Checklist, Group, School } from "@mui/icons-material";
import { useAuthContext, useDrawerContext } from "../../contexts";
import { GridDashContent } from "./GridDashContent";
import { GridDashOrgan } from "./Organ";
import { SelectSchoolAdmin } from "../select";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/pt-br";
dayjs.extend(localizedFormat);

export const GridDashSchoolAdmin = () => {
  const { schoolDataAdmin } = useAuthContext();
  const { handleClickFrequency } = useDrawerContext();

  return (
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
          <SelectSchoolAdmin />
        </Box>
      </Grid>
      {schoolDataAdmin && (
        <>
          <GridDashContent
            icon={<Group fontSize="large" />}
            quant={schoolDataAdmin.students}
            info={schoolDataAdmin.students === 1 ? "Aluno" : "Alunos"}
            dest="/school/student"
          />
          <GridDashContent
            icon={<Checklist fontSize="large" />}
            quant={
              schoolDataAdmin.frequencies === 0
                ? "-"
                : schoolDataAdmin.frequencies
            }
            info={
              schoolDataAdmin.frequencies === 1 ? "Frequência" : "Frequências"
            }
            dest="/frequency/list"
            onClick={handleClickFrequency}
          />
          <GridDashContent
            icon={<School fontSize="large" />}
            quant={schoolDataAdmin.infrequency.toFixed(0) + "%"}
            info="Infrequência"
            dest="/school/class"
          />
        </>
      )}
      <GridDashOrgan />
    </Grid>
  );
};
