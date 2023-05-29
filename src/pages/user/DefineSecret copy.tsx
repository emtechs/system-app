import { BasePage, BoxResp, ValidateCPF } from "../../shared/components";
import { useAppThemeContext, useUserContext } from "../../shared/contexts";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSecretSchema } from "../../shared/schemas";
import { useEffect, useState } from "react";
import { apiUsingNow } from "../../shared/services";
import { iUser } from "../../shared/interfaces";
import { Box, Typography } from "@mui/material";

interface iDefineSecretProps {
  back?: string;
}

export const DefineSecret = ({ back }: iDefineSecretProps) => {
  const { setLoading } = useAppThemeContext();
  const { createSecret, updateAllUser } = useUserContext();
  const [secretData, setSecretData] = useState<iUser>();

  useEffect(() => {
    setLoading(true);
    apiUsingNow
      .get<iUser[]>("users?role=SECRET")
      .then((res) => setSecretData(res.data[0]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <BasePage isProfile back={back}>
      <FormContainer
        onSuccess={(data) => {
          if (secretData)
            updateAllUser(
              secretData.id,
              {
                is_active: false,
                role: "SERV",
              },
              true
            );
          createSecret(data, back);
        }}
        resolver={zodResolver(createSecretSchema)}
      >
        <BoxResp isProfile>
          {secretData && (
            <Box>
              <Typography>Secretário Atual</Typography>
              <Typography>Nome: {secretData.name}</Typography>
              <Typography>CPF: {secretData.cpf}</Typography>
            </Box>
          )}
          <TextFieldElement name="cpf" label="CPF" required fullWidth />
          <TextFieldElement name="name" label="Nome" required fullWidth />
          <ValidateCPF allNotServ />
        </BoxResp>
      </FormContainer>
    </BasePage>
  );
};
