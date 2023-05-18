import { useEffect, useState } from "react";
import { useAuthContext, useSchoolContext } from "../../../shared/contexts";
import { iClass } from "../../../shared/interfaces";
import { apiUsingNow } from "../../../shared/services";
import { BasePage, BoxResp } from "../../../shared/components";
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

export const CreateStudent = () => {
  const { schoolData } = useAuthContext();
  const { createStudent } = useSchoolContext();
  const [data, setData] = useState<iData[]>();
  const [loading, setloading] = useState(false);
  useEffect(() => {
    setloading(true);
    apiUsingNow
      .get<iClass[]>(`classes?school_id=${schoolData?.school.id}`)
      .then((res) => {
        setData(
          res.data.map((el) => {
            return { ...el, label: el.name };
          })
        );
        setloading(false);
      });
  }, []);

  return (
    <BasePage isProfile>
      <FormContainer
        onSuccess={(data) => {
          if (schoolData) createStudent(data, schoolData.school.id);
        }}
        resolver={zodResolver(studentCreateSchema)}
      >
        <BoxResp isProfile>
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
