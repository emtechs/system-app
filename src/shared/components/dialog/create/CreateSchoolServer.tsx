import { AutocompleteElement, FormContainer } from "react-hook-form-mui";
import { BaseContentChildren, DialogBaseChildren } from "../..";
import {
  useAppThemeContext,
  useDialogContext,
  useSchoolContext,
} from "../../../contexts";
import { zodResolver } from "@hookform/resolvers/zod";
import { defineServerSchema } from "../../../schemas";
import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { apiSchool, apiUsingNow } from "../../../services";
import {
  iDialogUserProps,
  iSchool,
  iSchoolServerRequest,
} from "../../../interfaces";

export const DialogCreateSchoolServer = ({
  locale,
  user,
}: iDialogUserProps) => {
  const { setLoading, handleSucess, handleError } = useAppThemeContext();
  const { openCreate, handleOpenCreate, openEdit, handleOpenEdit } =
    useDialogContext();
  const { getSchools } = useSchoolContext();
  const [schoolDataSelect, setSchoolDataSelect] = useState<iSchool[]>();

  const open = locale === "data" ? openEdit : openCreate;

  const onClose = locale === "data" ? handleOpenEdit : handleOpenCreate;

  useEffect(() => {
    apiUsingNow
      .get<{ result: iSchool[] }>(`schools?server_id=${user.id}&is_active=true`)
      .then((res) => setSchoolDataSelect(res.data.result));
  }, [user]);

  const createSchoolServer = async (
    data: iSchoolServerRequest,
    server_id: string
  ) => {
    try {
      setLoading(true);
      await apiSchool.createServer(data, server_id);
      handleSucess("O servidor foi cadastrada com sucesso na escola!");
      if (locale === "list") getSchools(`?server_id=${user.id}`);
    } catch {
      handleError(
        "No momento, não foi possível cadastrar o servidor na escola. Por favor, tente novamente mais tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogBaseChildren
      open={open}
      onClose={onClose}
      title="Nova Escola"
      description=""
    >
      <FormContainer
        onSuccess={(data) => {
          createSchoolServer(data, user.id);
          onClose();
        }}
        resolver={zodResolver(defineServerSchema)}
      >
        <BaseContentChildren>
          <Typography>Usuário: {user.name}</Typography>
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
