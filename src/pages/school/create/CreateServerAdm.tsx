import {
  AutocompleteElement,
  FormContainer,
  RadioButtonGroup,
  TextFieldElement,
} from "react-hook-form-mui";
import { useSchoolContext } from "../../../shared/contexts";
import { useEffect, useState } from "react";
import { iPageProps, iSchool, iSchoolSelect } from "../../../shared/interfaces";
import { apiUsingNow } from "../../../shared/services";
import { BasePage, BoxResp, SchoolValidate } from "../../../shared/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { serverCreateSchema } from "../../../shared/schemas";

export const CreateServerAdm = ({ back }: iPageProps) => {
  const { createServer, schoolSelect } = useSchoolContext();
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
          if (schoolSelect) createServer(data, schoolSelect.id, back);
        }}
        resolver={zodResolver(serverCreateSchema)}
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
          <TextFieldElement name="cpf" label="CPF" required fullWidth />
          <TextFieldElement name="name" label="Nome" required fullWidth />
          <RadioButtonGroup
            label="Tela do Usuário"
            name="dash"
            options={[
              {
                id: "COMMON",
                label: "Comum",
              },
              {
                id: "SCHOOL",
                label: "Escola",
              },
            ]}
            required
          />
          <SchoolValidate isCPF />
        </BoxResp>
      </FormContainer>
    </BasePage>
  );
};
