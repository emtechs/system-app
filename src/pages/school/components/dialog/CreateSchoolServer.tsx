import { AutocompleteElement, FormContainer } from "react-hook-form-mui";
import {
  BaseContentChildren,
  DialogBaseChildren,
} from "../../../../shared/components";
import { useSchoolContext } from "../../../../shared/contexts";
import { zodResolver } from "@hookform/resolvers/zod";
import { defineServerSchema } from "../../../../shared/schemas";
import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { apiUsingNow } from "../../../../shared/services";
import { iSchool, iUser } from "../../../../shared/interfaces";

interface iCreateSchoolServerProps {
  server: iUser;
}

export const CreateSchoolServer = ({ server }: iCreateSchoolServerProps) => {
  const { openCreate, handleOpenCreate, createSchoolServer } =
    useSchoolContext();
  const [schoolDataSelect, setSchoolDataSelect] = useState<iSchool[]>();

  useEffect(() => {
    apiUsingNow
      .get<{ result: iSchool[] }>(
        `schools?server_id=${server.id}&is_active=true&by=asc&order=name`
      )
      .then((res) => setSchoolDataSelect(res.data.result));
  }, []);

  return (
    <DialogBaseChildren
      open={openCreate}
      onClose={handleOpenCreate}
      title="Nova Escola"
      description=""
    >
      <FormContainer
        onSuccess={(data) => {
          createSchoolServer(data, server.id);
          handleOpenCreate();
        }}
        resolver={zodResolver(defineServerSchema)}
      >
        <BaseContentChildren>
          <Typography>Usuário: {server.name}</Typography>
          <AutocompleteElement
            name="schools"
            label="Escola"
            multiple
            required
            loading={!schoolDataSelect}
            textFieldProps={{ fullWidth: true }}
            options={
              schoolDataSelect && schoolDataSelect.length > 0
                ? schoolDataSelect
                : [
                    {
                      id: 1,
                      label: "No momento, não há nenhuma escola disponível",
                    },
                  ]
            }
          />
          <Button variant="contained" type="submit" fullWidth>
            Salvar
          </Button>
        </BaseContentChildren>
      </FormContainer>
    </DialogBaseChildren>
  );
};
