import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TableCell,
  TableRow,
} from "@mui/material";
import { usePaginationContext, useUserContext } from "../../shared/contexts";
import { useEffect, useState } from "react";
import { iUser, iheadCell } from "../../shared/interfaces";
import { apiUsingNow } from "../../shared/services";
import { TableBase, Tools } from "../../shared/components";
import { FormContainer, RadioButtonGroup } from "react-hook-form-mui";
import { zodResolver } from "@hookform/resolvers/zod";
import { activeUserSchema } from "../../shared/schemas";
import { useDebounce } from "../../shared/hooks";
import { useSearchParams } from "react-router-dom";
import { LayoutBasePage } from "../../shared/layouts";

const headCells: iheadCell[] = [
  { order: "name", numeric: false, label: "Nome Completo" },
  { numeric: false, label: "CPF" },
];

interface iCardUserProps {
  user: iUser;
}

const CardUser = ({ user }: iCardUserProps) => {
  const { updateUserData, setUpdateUserData, updateAllUser } = useUserContext();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setUpdateUserData(user);
    setOpen((oldOpen) => !oldOpen);
  };

  return (
    <>
      <TableRow hover sx={{ cursor: "pointer" }} onClick={handleClose}>
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.cpf}</TableCell>
      </TableRow>

      {updateUserData && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Ativar Usuário</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Deseja continuar ativando o usúario{" "}
              {updateUserData.name.toUpperCase()}?
            </DialogContentText>
            <FormContainer
              onSuccess={(data) => {
                updateAllUser(updateUserData.id, data, false);
                setOpen(!open);
              }}
              resolver={zodResolver(activeUserSchema)}
            >
              <Box mt={1} display="flex" flexDirection="column" gap={1}>
                <RadioButtonGroup
                  label="Tipo do Usuário"
                  name="role"
                  options={[
                    {
                      id: "ADMIN",
                      label: "Administrador",
                    },
                    {
                      id: "SERV",
                      label: "Servidor",
                    },
                  ]}
                  required
                />
                <Button variant="contained" type="submit" fullWidth>
                  Continuar
                </Button>
              </Box>
            </FormContainer>
            <DialogActions>
              <Button onClick={handleClose}>Cancelar</Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export const ActiveUserPage = () => {
  const [searchParams] = useSearchParams();
  const orderData = searchParams.get("order");
  const { debounce } = useDebounce();
  const { updateUserData } = useUserContext();
  const { setCount, take, skip, order, setOrder, by, setIsLoading } =
    usePaginationContext();
  const [listUserData, setListUserData] = useState<iUser[]>();
  const [search, setSearch] = useState<string>();

  useEffect(() => {
    let query = `?is_active=false&by=${by}`;
    if (order) {
      query += `&order=${order}`;
    } else if (orderData) {
      setOrder(orderData);
      query += `&order=${orderData}`;
    }
    if (take) query += `&take=${take}`;
    if (skip) query += `&skip=${skip}`;
    if (search) {
      query += `&name=${search}`;
      setIsLoading(true);
      debounce(() => {
        apiUsingNow
          .get<{ total: number; result: iUser[] }>(`users${query}`)
          .then((res) => {
            setListUserData(res.data.result);
            setCount(res.data.total);
          })
          .finally(() => setIsLoading(false));
      });
    } else {
      setIsLoading(true);
      apiUsingNow
        .get<{ total: number; result: iUser[] }>(`users${query}`)
        .then((res) => {
          setListUserData(res.data.result);
          setCount(res.data.total);
        })
        .finally(() => setIsLoading(false));
    }
  }, [updateUserData, take, skip, orderData, order, by, search]);

  return (
    <LayoutBasePage
      title="Listagem de Usuários"
      tools={
        <Tools
          isHome
          back="/user/list"
          isSearch
          search={search}
          setSearch={setSearch}
        />
      }
    >
      <TableBase headCells={headCells}>
        {listUserData?.map((el) => (
          <CardUser key={el.id} user={el} />
        ))}
      </TableBase>
    </LayoutBasePage>
  );
};
