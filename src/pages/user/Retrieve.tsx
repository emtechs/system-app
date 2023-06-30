import {
  Breadcrumbs,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {
  useAppThemeContext,
  useDrawerContext,
  usePaginationContext,
  useSchoolContext,
  useUserContext,
} from "../../shared/contexts";
import { useEffect, useState } from "react";
import { iWorkSchool, iheadCell } from "../../shared/interfaces";
import { apiUsingNow } from "../../shared/services";
import { Home, People, Person, RemoveDone, School } from "@mui/icons-material";
import { LinkRouter, TableBase, Tools } from "../../shared/components";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../../shared/hooks";
import { LayoutBasePage } from "../../shared/layouts";
import { CardWorkSchool } from "./components";

const headCells: iheadCell[] = [
  { order: "name", numeric: false, label: "Escola" },
  { numeric: false, label: "Função" },
  { numeric: false, label: "Tela" },
];

interface iRetrieveUserPageProps {
  id: string;
}

export const RetrieveUserPage = ({ id }: iRetrieveUserPageProps) => {
  const [searchParams] = useSearchParams();
  const school_id = searchParams.get("school_id");
  const orderData = searchParams.get("order");
  const { debounce } = useDebounce();
  const { mdDown } = useAppThemeContext();
  const { updateAllUser, updateUserData, labelUser } = useUserContext();
  const { updateServerData } = useSchoolContext();
  const { setCount, take, skip, order, setOrder, by, setIsLoading } =
    usePaginationContext();
  const { handleClickSchool, handleClickButtonTools } = useDrawerContext();
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

  return (
    <>
      <LayoutBasePage
        title={
          <Breadcrumbs
            maxItems={mdDown ? 2 : undefined}
            aria-label="breadcrumb"
          >
            <LinkRouter
              underline="none"
              color="inherit"
              to="/"
              onClick={handleClickButtonTools}
            >
              <Chip
                clickable
                color="primary"
                variant="outlined"
                label={mdDown ? "..." : "Página Inicial"}
                icon={<Home sx={{ mr: 0.5 }} fontSize="inherit" />}
              />
            </LinkRouter>
            <LinkRouter underline="none" color="inherit" to="/user">
              <Chip
                clickable
                color="primary"
                variant="outlined"
                label={mdDown ? "..." : "Usuários"}
                icon={<People sx={{ mr: 0.5 }} fontSize="inherit" />}
              />
            </LinkRouter>
            <Chip
              label={labelUser()}
              color="primary"
              icon={<Person sx={{ mr: 0.5 }} fontSize="inherit" />}
            />
          </Breadcrumbs>
        }
        tools={
          <Tools
            back={
              school_id ? `/school?id=${school_id}&order=name` : "/user/list"
            }
            isHome
            isNew
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
            <CardWorkSchool
              key={el.school.id}
              user={updateUserData}
              work={el}
            />
          ))}
        </TableBase>
      </LayoutBasePage>
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
