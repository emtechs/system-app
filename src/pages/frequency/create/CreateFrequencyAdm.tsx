import { FormContainer, useFormContext } from "react-hook-form-mui";
import {
  SelectClassSelectData,
  SelectSchoolSelectData,
} from "../../../shared/components";
import { useAuthContext, useFrequencyContext } from "../../../shared/contexts";
import { zodResolver } from "@hookform/resolvers/zod";
import { frequencyCreateSchema } from "../../../shared/schemas";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";
import { iClass, iFrequency } from "../../../shared/interfaces";
import { apiUsingNow } from "../../../shared/services";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Link } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/pt-br";
import { LayoutBasePage } from "../../../shared/layouts";

interface iDateValueProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DateValue = ({ setOpen }: iDateValueProps) => {
  const { watch, setValue } = useFormContext();
  const { schoolYear } = useAuthContext();
  const { setFrequencyData } = useFrequencyContext();
  const [dateData, setDateData] = useState<Dayjs | null>(dayjs());
  const classData: iClass = watch("class");

  useEffect(() => {
    if (classData && dateData) {
      const date = dateData.format("DD/MM/YYYY");
      apiUsingNow
        .get<iFrequency[]>(`frequencies?date=${date}&class_id=${classData.id}`)
        .then((res) => {
          if (res.data[0].id) {
            setFrequencyData(res.data[0]);
            setOpen(true);
            setDateData(null);
          }
        });
      setValue("school_year_id", schoolYear);
      setValue("date", date);
      setValue("month", +date.split("/")[1]);
      setValue("day", +date.split("/")[0]);
    }
  }, [classData, dateData]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          value={dateData}
          label="Data"
          onChange={(newValue) => setDateData(newValue)}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export const CreateFrequencyAdm = () => {
  const { createFrequency, frequencyData } = useFrequencyContext();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(!open);

  return (
    <>
      <LayoutBasePage
        title="Nova Frequência"
        school={<SelectSchoolSelectData />}
      >
        <FormContainer
          onSuccess={createFrequency}
          resolver={zodResolver(frequencyCreateSchema)}
        >
          <Box
            m={2}
            display="flex"
            flexDirection="column"
            component={Paper}
            variant="outlined"
          >
            <Grid container direction="column" p={2} spacing={2}>
              <Grid container item direction="row" justifyContent="center">
                <Grid item xs={12} sm={9} md={6} lg={3}>
                  <SelectClassSelectData />
                </Grid>
              </Grid>
              <Grid container item direction="row" justifyContent="center">
                <Grid item xs={12} sm={9} md={6} lg={3}>
                  <DateValue setOpen={setOpen} />
                </Grid>
              </Grid>
              <Grid container item direction="row" justifyContent="center">
                <Grid item xs={12} sm={9} md={6} lg={3}>
                  <Button variant="contained" type="submit" fullWidth>
                    Salvar
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </FormContainer>
      </LayoutBasePage>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {frequencyData?.status === "OPENED" ? (
          <>
            <DialogTitle id="alert-dialog-title">
              {"Já existe uma frequência cadastrada"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Você está tentando cadastrar uma frequência para uma turma que
                já existe. Você pode realizar essa frequência ou cadastrar uma
                nova frequência para outra data ou turma.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cadastrar</Button>
              <Link to={"/frequency/" + frequencyData.id}>
                <Button onClick={handleClose} autoFocus>
                  Realizar
                </Button>
              </Link>
            </DialogActions>
          </>
        ) : (
          <>
            <DialogTitle id="alert-dialog-title">
              {"Essa frequência já foi lançada no sistema"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Você está tentando cadastrar uma frequência para uma turma que
                já foi encerrada. Por favor, cadastre uma nova frequência para
                outra data ou turma.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cadastrar</Button>
              <Link to="/">
                <Button onClick={handleClose} autoFocus>
                  Sair
                </Button>
              </Link>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
};
