import { FormContainer, useFormContext } from "react-hook-form-mui";
import { CalendarFrequency, SelectClassData } from "../../../shared/components";
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
import { Navigate } from "react-router-dom";

const DateValue = () => {
  const { setValue, formState } = useFormContext();
  const { schoolData, yearData } = useAuthContext();
  const { classWithSchoolSelect } = useClassContext();
  const { dateFrequency, buttonFreqRef } = useCalendarContext();
  const { errors } = formState;

  const errMessage = useMemo(() => {
    return typeof errors.date?.message === "string" ? errors.date.message : "";
  }, [errors.date]);

  useEffect(() => {
    if (schoolData && yearData && dateFrequency) {
      setValue("school", schoolData.school);
      setValue("year_id", yearData.id);
      setValue("date", dateFrequency.format("DD/MM/YYYY"));
    }
  }, [schoolData, yearData, dateFrequency]);

  if (!schoolData) {
    return <Navigate to="/" />;
  }

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
      <Button ref={buttonFreqRef} variant="contained" type="submit" fullWidth>
        Realizar
      </Button>
    </Box>
  );
};

export const CreateFrequencyCommon = () => {
  const { theme } = useAppThemeContext();
  const { createFrequency } = useFrequencyContext();

  return (
    <LayoutBasePage title="Nova Frequência">
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
                      <CalendarFrequency />
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
                      <SelectClassData />
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
