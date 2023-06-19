import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TableCell,
  TableRow,
} from "@mui/material";
import {
  useDrawerContext,
  usePaginationContext,
  useSchoolContext,
  useUserContext,
} from "../../shared/contexts";
import { useEffect, useState } from "react";
import { iUser, iWorkSchool, iheadCell } from "../../shared/interfaces";
import { apiUsingNow } from "../../shared/services";
import { RemoveDone, School } from "@mui/icons-material";
import { TableBase, Tools } from "../../shared/components";
import { Navigate, useSearchParams } from "react-router-dom";
import { rolePtBr } from "../../shared/scripts";
import { LayoutUserPage } from "./Layout";
import { useDebounce } from "../../shared/hooks";

const headCells: iheadCell[] = [
  { order: "name", numeric: false, label: "Escola" },
  { numeric: false, label: "Função" },
  { numeric: false, label: "Tela" },
];

interface iCardUserProps {
  user?: iUser;
  work: iWorkSchool;
}

const CardUser = ({ user, work }: iCardUserProps) => {
  const { updateServerData, setUpdateServerData, deleteServer } =
    useSchoolContext();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen((oldOpen) => !oldOpen);
    setUpdateServerData(work);
  };

  return (
    <>
      <TableRow hover sx={{ cursor: "pointer" }} onClick={handleClose}>
        <TableCell>{work.school.name}</TableCell>
        <TableCell>{rolePtBr(work.role)}</TableCell>
        <TableCell>
          {work.dash === "SCHOOL" ? "Escola" : "Frequência"}
        </TableCell>
      </TableRow>

      {user && updateServerData && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Remover Usuário da Função</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Deseja continuar removendo o usúario {user.name.toUpperCase()} da
              Função {rolePtBr(updateServerData.role).toUpperCase()} da Escola{" "}
              {updateServerData.school.name}?
            </DialogContentText>
            <DialogActions>
              <Button onClick={handleClose}>Cancelar</Button>
              <Button
                onClick={() => {
                  deleteServer(updateServerData.school.id, user.id);
                  setOpen(!open);
                }}
              >
                Continuar
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export const RetrieveUserPage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const school_id = searchParams.get("school_id");
  const orderData = searchParams.get("order");
  const { debounce } = useDebounce();
  const { updateAllUser, updateUserData } = useUserContext();
  const { updateServerData } = useSchoolContext();
  const { setCount, take, skip, order, setOrder, by, setIsLoading } =
    usePaginationContext();
  const { handleClickSchool } = useDrawerContext();
  const [retrieveUser, setRetrieveUser] = useState<iWorkSchool[]>();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState<string>();

  const handleClose = () => {
    setOpen((oldOpen) => !oldOpen);
  };

  useEffect(() => {
    let query = `?by=${by}&is_active=true`;
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
      debounce(() => {
        setIsLoading(true);
        apiUsingNow
          .get<{ total: number; result: iWorkSchool[] }>(
            `users/${id}/server${query}`
          )
          .then((res) => {
            setCount(res.data.total);
            setRetrieveUser(res.data.result);
          })
          .finally(() => setIsLoading(false));
      });
    } else {
      setIsLoading(true);
      apiUsingNow
        .get<{ total: number; result: iWorkSchool[] }>(
          `users/${id}/server${query}`
        )
        .then((res) => {
          setCount(res.data.total);
          setRetrieveUser(res.data.result);
        })
        .finally(() => setIsLoading(false));
    }
  }, [updateServerData, take, skip, orderData, order, by, search]);

  if (!id) {
    return <Navigate to="/user/list" />;
  }

  return (
    <>
      <LayoutUserPage
        title={
          updateUserData?.name
            ? updateUserData.name
            : "Listagem de Funções do Usuários"
        }
        tools={
          <Tools
            back={
              school_id ? `/school?id=${school_id}&order=name` : "/user/list"
            }
            isHome
            isNew
            destNew={`/school/create/server?cpf=${updateUserData?.cpf}&name=${updateUserData?.name}&back_click=user&back=/user?id=${updateUserData?.id}&order=name`}
            iconNew={<School />}
            onClickNew={handleClickSchool}
            isSearch
            search={search}
            setSearch={setSearch}
            finish={
              <Button
                variant="contained"
                color="error"
                disableElevation
                onClick={handleClose}
                endIcon={<RemoveDone />}
              >
                Desativar
              </Button>
            }
          />
        }
      >
        <TableBase headCells={headCells}>
          {retrieveUser?.map((el) => (
            <CardUser key={el.school.id} user={updateUserData} work={el} />
          ))}
        </TableBase>
      </LayoutUserPage>
      {updateUserData && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Desativar Usuário</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Deseja continuar desativando o usúario{" "}
              {updateUserData.name.toUpperCase()}?
            </DialogContentText>
            <DialogActions>
              <Button onClick={handleClose}>Cancelar</Button>
              <Button
                onClick={() => {
                  updateAllUser(
                    updateUserData.id,
                    {
                      role: "SERV",
                      is_active: false,
                    },
                    false,
                    "/user/list"
                  );
                  setOpen(!open);
                }}
              >
                Continuar
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
