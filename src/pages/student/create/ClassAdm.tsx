import {
  AutocompleteElement,
  FormContainer,
  TextFieldElement,
} from "react-hook-form-mui";
import { BasePage, BoxResp, SchoolValidate } from "../../../shared/components";
import { useSchoolContext } from "../../../shared/contexts";
import { Button } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { classCreateSchema } from "../../../shared/schemas";
import { iPageProps, iSchool, iSchoolSelect } from "../../../shared/interfaces";
import { useEffect, useState } from "react";
import { apiUsingNow } from "../../../shared/services";

export const CreateClassAdm = ({ back }: iPageProps) => {
  const { createClass, schoolSelect } = useSchoolContext();
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

  return (
    <BasePage isProfile back={back}>
      <FormContainer
        onSuccess={(data) => {
          if (schoolSelect) createClass(data, schoolSelect.id, back);
        }}
        resolver={zodResolver(classCreateSchema)}
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
          <Button variant="contained" type="submit" fullWidth>
            Salvar
          </Button>
        </BoxResp>
      </FormContainer>
    </BasePage>
  );
};
