import { useEffect, useState } from "react";
import { useSchoolContext } from "../../../shared/contexts";
import {
  iClass,
  iPageProps,
  iSchool,
  iSchoolSelect,
} from "../../../shared/interfaces";
import { apiUsingNow } from "../../../shared/services";
import { BasePage, BoxResp, SchoolValidate } from "../../../shared/components";
import {
  AutocompleteElement,
  FormContainer,
  TextFieldElement,
} from "react-hook-form-mui";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentCreateSchema } from "../../../shared/schemas";
import { Button } from "@mui/material";

interface iData extends iClass {
  label: string;
}

export const CreateStudentAdm = ({ back }: iPageProps) => {
  const { createStudent, schoolSelect } = useSchoolContext();
  const [schoolsSelect, setSchoolsSelect] = useState<iSchoolSelect[]>();
  const [schoolsLoading, setSchoolsLoading] = useState(true);
  const [data, setData] = useState<iData[]>();
  const [loading, setloading] = useState(false);

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
    <BasePage isProfile back={back}>
      <FormContainer
        onSuccess={(data) => {
          if (schoolSelect) createStudent(data, schoolSelect.id, back);
        }}
        resolver={zodResolver(studentCreateSchema)}
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
          <TextFieldElement name="name" label="Nome" required fullWidth />
          <TextFieldElement
            name="registry"
            label="Matricula"
            required
            fullWidth
          />
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
          <Button variant="contained" type="submit" fullWidth>
            Salvar
          </Button>
        </BoxResp>
      </FormContainer>
    </BasePage>
  );
};
