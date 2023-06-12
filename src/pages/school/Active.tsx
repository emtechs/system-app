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
  useAuthContext,
  useSchoolContext,
  useTableContext,
} from "../../shared/contexts";
import { useEffect, useState } from "react";
import { iSchool, iheadCell } from "../../shared/interfaces";
import { apiUsingNow } from "../../shared/services";
import { TableBase, Tools } from "../../shared/components";
import { LayoutSchoolPage } from "./Layout";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../../shared/hooks";

const headCells: iheadCell[] = [
  { order: "name", numeric: false, label: "Escola" },
];

interface iCardSchoolProps {
  school: iSchool;
}

const CardSchool = ({ school }: iCardSchoolProps) => {
  const { updateSchoolData, setUpdateSchoolData, updateSchool } =
    useSchoolContext();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setUpdateSchoolData(school);
    setOpen((oldOpen) => !oldOpen);
  };

  return (
    <>
      <TableRow hover sx={{ cursor: "pointer" }} onClick={handleClose}>
        <TableCell>{school.name}</TableCell>
      </TableRow>

      {updateSchoolData && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Ativar Escola</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Deseja continuar ativando a Escola{" "}
              {updateSchoolData.name.toUpperCase()}?
            </DialogContentText>
            <DialogActions>
              <Button onClick={handleClose}>Cancelar</Button>
              <Button
                onClick={() => {
                  updateSchool(
                    {
                      is_active: true,
                    },
                    updateSchoolData.id,
                    "estado"
                  );
                  setOpen(false);
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

export const ActiveSchoolPage = () => {
  const [searchParams] = useSearchParams();
  const orderData = searchParams.get("order");
  const { debounce } = useDebounce();
  const { yearId } = useAuthContext();
  const { updateSchoolData } = useSchoolContext();
  const { setCount, take, skip, order, setOrder, by, setIsLoading } =
    useTableContext();
  const [listSchoolData, setListSchoolData] = useState<iSchool[]>();
  const [search, setSearch] = useState<string>();

  useEffect(() => {
    if (yearId) {
      let query = `?year_id=${yearId}&by=${by}&is_active=false`;
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
            .get<{ total: number; result: iSchool[] }>(`schools${query}`)
            .then((res) => {
              setListSchoolData(res.data.result);
              setCount(res.data.total);
            })
            .finally(() => setIsLoading(false));
        });
      } else {
        setIsLoading(true);
        apiUsingNow
          .get<{ total: number; result: iSchool[] }>(`schools${query}`)
          .then((res) => {
            setListSchoolData(res.data.result);
            setCount(res.data.total);
          })
          .finally(() => setIsLoading(false));
      }
    }
  }, [yearId, updateSchoolData, take, skip, orderData, order, by, search]);

  return (
    <LayoutSchoolPage
      title="Listagem de Escolas Inativas"
      tools={
        <Tools
          isHome
          isSearch
          search={search}
          setSearch={(text) => setSearch(text)}
        />
      }
    >
      <TableBase headCells={headCells}>
        {listSchoolData?.map((el) => (
          <CardSchool key={el.id} school={el} />
        ))}
      </TableBase>
    </LayoutSchoolPage>
  );
};
