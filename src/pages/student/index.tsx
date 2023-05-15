import {
  AutocompleteElement,
  FormContainer,
  TextFieldElement,
} from "react-hook-form-mui";
import { BasePage, BoxResp, Glossary } from "../../shared/components";
import {
  useModalProfileContext,
  useSchoolContext,
  useUserContext,
} from "../../shared/contexts";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentCreateSchema } from "../../shared/schemas";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { iClass } from "../../shared/interfaces";
import { apiUsingNow } from "../../shared/services";

interface iData extends iClass {
  label: string;
}

export const Student = () => {
  const { schoolData } = useUserContext();
  const { createStudent } = useSchoolContext();
  const { openGlossary, handleOpenGlossary } = useModalProfileContext();
  const [data, setData] = useState<iData[]>();
  const [loading, setloading] = useState(false);
  useEffect(() => {
    setloading(true);
    apiUsingNow.get<iClass[]>("classes").then((res) => {
      setData(
        res.data.map((el) => {
          return { ...el, label: el.name };
        })
      );
      setloading(false);
    });
  }, []);

  return (
    <>
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
      <Glossary open={openGlossary} onClose={handleOpenGlossary}>
        <></>
      </Glossary>
    </>
  );
};
