import { FormContainer, useFormContext } from "react-hook-form-mui";
import {
  CalendarFrequencyAdm,
  SelectClassSelectData,
  SelectSchoolSelectData,
} from "../../../shared/components";
import {
  useAppThemeContext,
  useAuthContext,
  useCalendarContext,
  useClassContext,
  useFrequencyContext,
} from "../../../shared/contexts";
import { zodResolver } from "@hookform/resolvers/zod";
import { frequencyCreateSchema } from "../../../shared/schemas";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useMemo } from "react";
import { LayoutBasePage } from "../../../shared/layouts";

const DateValue = () => {
  const { setValue, formState } = useFormContext();
  const { yearData } = useAuthContext();
  const { classWithSchoolSelect } = useClassContext();
  const { dateFrequency } = useCalendarContext();
  const { errors } = formState;

  const errMessage = useMemo(() => {
    return typeof errors.date?.message === "string" ? errors.date.message : "";
  }, [errors.date]);

  useEffect(() => {
    if (yearData && dateFrequency) {
      setValue("year_id", yearData.id);
      setValue("date", dateFrequency.format("DD/MM/YYYY"));
    }
  }, [yearData, dateFrequency]);

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="body2">
        {classWithSchoolSelect
          ? "Infrequência da Turma: " +
            String(classWithSchoolSelect.infrequency).replace(".", ",") +
            "%"
          : ""}
      </Typography>
      <Typography
        variant={dateFrequency ? "h6" : "subtitle1"}
        color={dateFrequency ? undefined : "error"}
        align="center"
      >
        {dateFrequency ? dateFrequency.format("dddd, LL") : errMessage}
      </Typography>
      <Button variant="contained" type="submit" fullWidth>
        Realizar
      </Button>
    </Box>
  );
};

export const CreateFrequencyAdm = () => {
  const { theme } = useAppThemeContext();
  const { createFrequency } = useFrequencyContext();

  return (
    <LayoutBasePage title="Nova Frequência" school={<SelectSchoolSelectData />}>
      <FormContainer
        onSuccess={createFrequency}
        resolver={zodResolver(frequencyCreateSchema)}
      >
        <Box mx={2} component={Paper} variant="outlined">
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
                      <CalendarFrequencyAdm />
                    </Box>
                  </Grid>
                  <Grid
                    container
                    item
                    direction="row"
                    alignContent="center"
                    justifyContent="center"
                    xs={12}
                    md={5}
                    spacing={2}
                  >
                    <Grid item xs={12}>
                      <SelectClassSelectData />
                    </Grid>
                    <Grid item xs={12}>
                      <DateValue />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </FormContainer>
    </LayoutBasePage>
  );
};
