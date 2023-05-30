import { Checklist } from "@mui/icons-material";
import { Box, Button, Paper, useTheme } from "@mui/material";
import {
  useClassContext,
  useFrequencyContext,
  useSchoolContext,
} from "../../contexts";

export const ToolsFrequency = () => {
  const theme = useTheme();
  const { updateStudent } = useSchoolContext();
  const { updateFrequency, retrieveFreq } = useFrequencyContext();
  const { updateClassSchool } = useClassContext();
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
      height={theme.spacing(5)}
      marginX={1}
      padding={1}
      paddingX={2}
      component={Paper}
    >
      <Box flex={1} display="flex" justifyContent="end">
        <Button
          onClick={() => {
            if (retrieveFreq) {
              updateFrequency(
                { status: "CLOSED", finished_at: Date.now() },
                retrieveFreq.id
              );
              retrieveFreq.students.forEach((el) => {
                updateStudent({ infreq: el.infrequency }, el.id);
              });
              updateClassSchool({
                class_id: retrieveFreq.class.class.id,
                school_id: retrieveFreq.class.school.id,
                school_year_id: retrieveFreq.class.school_year.id,
                class_infreq: retrieveFreq.class_infreq
                  ? retrieveFreq.class_infreq
                  : 0,
                school_infreq: retrieveFreq.school_infreq
                  ? retrieveFreq.school_infreq
                  : 0,
              });
            }
          }}
          disableElevation
          variant="contained"
          endIcon={<Checklist />}
        >
          Finalizar
        </Button>
      </Box>
    </Box>
  );
};
