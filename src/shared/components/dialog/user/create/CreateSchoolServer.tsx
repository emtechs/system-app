import { zodResolver } from "@hookform/resolvers/zod";
import { Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { FormContainer, AutocompleteElement } from "react-hook-form-mui";
import { useNavigate } from "react-router-dom";
import {
  DialogBaseChildren,
  BaseContentChildren,
} from "../../../../components";
import {
  useAppThemeContext,
  useDialogContext,
  usePaginationContext,
  useUserContext,
  useSchoolContext,
} from "../../../../contexts";
import {
  iDialogUserProps,
  iSchool,
  iSchoolServerRequest,
} from "../../../../interfaces";
import { defineServerSchema } from "../../../../schemas";
import { apiUsingNow, apiSchool } from "../../../../services";

export const DialogCreateSchoolServer = ({
  locale,
  user,
  school,
}: iDialogUserProps) => {
  const navigate = useNavigate();
  const { setLoading, handleSucess, handleError } = useAppThemeContext();
  const { openCreate, handleOpenCreate, openEdit, handleOpenEdit } =
    useDialogContext();
  const { onClickReset } = usePaginationContext();
  const { userDataRetrieve } = useUserContext();
  const { getSchools } = useSchoolContext();
  const [schoolDataSelect, setSchoolDataSelect] = useState<iSchool[]>();

  const open = locale === "data" ? openEdit : openCreate;

  const onClose = locale === "data" ? handleOpenEdit : handleOpenCreate;

  useEffect(() => {
    apiUsingNow
      .get<{ result: iSchool[] }>(
        `schools?none_server_id=${user.id}&is_active=true`
      )
      .then((res) => setSchoolDataSelect(res.data.result));
  }, [user, school]);

  const createSchoolServer = async (
    data: iSchoolServerRequest,
    server_id: string
  ) => {
    try {
      setLoading(true);
      await apiSchool.createServer(data, server_id);
      handleSucess("O servidor foi cadastrada com sucesso na escola!");
      switch (locale) {
        case "data":
          onClickReset();
          navigate(`/user/${user.id}?view=school`);
          break;

        case "list":
          userDataRetrieve(user.id, "");
          getSchools(`?server_id=${user.id}`);
          break;
      }
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