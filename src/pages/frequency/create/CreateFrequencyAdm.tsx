import {
  AutocompleteElement,
  FormContainer,
  useFormContext,
} from "react-hook-form-mui";
import { BasePage, BoxResp, SchoolValidate } from "../../../shared/components";
import { useSchoolContext } from "../../../shared/contexts";
import { zodResolver } from "@hookform/resolvers/zod";
import { frequencyCreateSchema } from "../../../shared/schemas";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  iClass,
  iFrequency,
  iPageProps,
  iSchool,
  iSchoolSelect,
} from "../../../shared/interfaces";
import { apiUsingNow } from "../../../shared/services";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Link } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/pt-br";

interface iData extends iClass {
  label: string;
}

interface iDateValueProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DateValue = ({ setOpen }: iDateValueProps) => {
  const { watch, setValue } = useFormContext();
  const { setFrequencyData } = useSchoolContext();
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
      setValue("date", date);
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

export const CreateFrequencyAdm = ({ back }: iPageProps) => {
  const { createFrequency, frequencyData, schoolSelect } = useSchoolContext();
  const [data, setData] = useState<iData[]>();
  const [loading, setloading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(!open);
  const [schoolsSelect, setSchoolsSelect] = useState<iSchoolSelect[]>();
  const [schoolsLoading, setSchoolsLoading] = useState(true);

  useEffect(() => {
    apiUsingNow
      .get<iSchool[]>("schools")
      .then((res) => {
        if (res.data) {
          setSchoolsSelect(
            res.data.map((school) => {
              return { ...school, label: school.name };
            })
          );
        }
      })
      .finally(() => setSchoolsLoading(false));
  }, []);

  useEffect(() => {
    setloading(true);
    apiUsingNow
      .get<iClass[]>(`classes?school_id=${schoolSelect?.id}`)
      .then((res) => {
        setData(
          res.data.map((el) => {
            return { ...el, label: el.name };
          })
        );
        setloading(false);
      });
  }, [schoolSelect]);

  return (
    <>
      <BasePage isProfile back={back}>
        <FormContainer
          onSuccess={(data) => {
            if (schoolSelect) createFrequency(data, schoolSelect.id);
          }}
          resolver={zodResolver(frequencyCreateSchema)}
        >
          <BoxResp isProfile>
            <div style={{ width: "100%" }}>
              <AutocompleteElement
                name="school"
                label="Escola"
                loading={schoolsLoading}
                options={
                  schoolsSelect
                    ? schoolsSelect
                    : [
                        {
                          id: 1,
                          label: "No momento, não há nenhuma escola cadastrada",
                        },
                      ]
                }
              />
            </div>
            <SchoolValidate />
            <div style={{ width: "100%" }}>
              <AutocompleteElement
                name="class"
                label="Turma"
                options={
                  data?.length
                    ? data
                    : [
                        {
                          id: 1,
                          label: "No momento, não há nenhuma turma cadastrada",
                        },
                      ]
                }
                loading={loading}
              />
            </div>
            <DateValue setOpen={setOpen} />
            <Button variant="contained" type="submit" fullWidth>
              Salvar
            </Button>
          </BoxResp>
        </FormContainer>
      </BasePage>
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
              <Link to="/frequency">
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
