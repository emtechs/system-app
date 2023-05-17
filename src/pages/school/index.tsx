import { BasePage, BoxResp } from "../../shared/components";
import { useSchoolContext } from "../../shared/contexts";
import {
  AutocompleteElement,
  FormContainer,
  TextFieldElement,
} from "react-hook-form-mui";
import { zodResolver } from "@hookform/resolvers/zod";
import { schoolCreateSchema } from "../../shared/schemas";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { apiUsingNow } from "../../shared/services";
import { iUser } from "../../shared/interfaces";

interface iData extends iUser {
  label: string;
}

export const School = () => {
  const { createSchool } = useSchoolContext();
  const [data, setData] = useState<iData[]>();
  const [loading, setloading] = useState(false);
  useEffect(() => {
    setloading(true);
    apiUsingNow
      .get<iUser[]>("users?role=DIRET&isNot_director_school=true")
      .then((res) => {
        setData(
          res.data.map((user) => {
            return { ...user, label: user.name };
          })
        );
        setloading(false);
      });
  }, []);
  return (
    <BasePage isProfile>
      <FormContainer
        onSuccess={createSchool}
        resolver={zodResolver(schoolCreateSchema)}
      >
        <BoxResp isProfile>
          <TextFieldElement name="name" label="Nome" required fullWidth />
          <div style={{ width: "100%" }}>
            <AutocompleteElement
              name="director"
              label="Diretor"
              options={
                data?.length
                  ? data
                  : [
                      {
                        id: 1,
                        label:
                          "No momento, não há nenhum usuário do tipo Diretor disponível",
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
