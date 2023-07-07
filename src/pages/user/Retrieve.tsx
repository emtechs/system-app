import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {
  useAppThemeContext,
  useAuthContext,
  useDrawerContext,
  usePaginationContext,
  useUserContext,
} from "../../shared/contexts";
import { useCallback, useEffect, useState } from "react";
import { RemoveDone, School } from "@mui/icons-material";
import { TableWorkSchool, Tools } from "../../shared/components";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../../shared/hooks";
import { LayoutBasePage } from "../../shared/layouts";
import { TitleRetrieveUser } from "./components";
import { apiSchool } from "../../shared/services";
import { iSchool } from "../../shared/interfaces";

export const RetrieveUserPage = () => {
  const [searchParams] = useSearchParams();
  const school_id = searchParams.get("school_id");
  const { debounce } = useDebounce();
  const { mdDown } = useAppThemeContext();
  const { userSelect } = useAuthContext();
  const { updateAllUser, updateUserData } = useUserContext();
  const { defineQuery, query, setIsLoading, setCount, define_step } =
    usePaginationContext();
  const { handleClickSchool } = useDrawerContext();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState<string>();
  const [listData, setListData] = useState<iSchool[]>();

  const handleClose = () => {
    setOpen((oldOpen) => !oldOpen);
  };

  const getSchools = useCallback(
    (query: string, take: number) => {
      if (mdDown) {
        setIsLoading(true);
        apiSchool
          .list(query)
          .then((res) => {
            setListData(res.result);
            setCount(res.total);
            define_step(res.total, take);
          })
          .finally(() => setIsLoading(false));
      } else {
        setIsLoading(true);
        apiSchool
          .list(query)
          .then((res) => {
            setListData(res.result);
            setCount(res.total);
          })
          .finally(() => setIsLoading(false));
      }
    },
    [mdDown]
  );

  const queryData = useCallback(
    (take: number) => {
      let query_data = defineQuery();
      if (mdDown) {
        query_data = query(take);
        return query_data;
      }
      return query_data;
    },
    [defineQuery, query, mdDown]
  );

  useEffect(() => {
    const take = 5;
    let query = queryData(take);
    if (search) {
      query += `&name=${search}`;
      debounce(() => {
        getSchools(query, take);
      });
    } else {
      getSchools(query, take);
    }
  }, [queryData, search]);

  return (
    <>
      <LayoutBasePage
        title={<TitleRetrieveUser />}
        tools={
          <Tools
            back={
              school_id ? `/school?id=${school_id}&order=name` : "/user/list"
            }
            isHome
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
        <TableWorkSchool listSchool={listData} user={userSelect} />
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
