import { useNavigate } from "react-router-dom";
import { useDebounce } from "../hooks";
import {
  useAppThemeContext,
  useDialogContext,
  usePaginationContext,
} from "../contexts";
import { iSchool, iViewBaseProps, iheadCell } from "../interfaces";
import { useCallback, useEffect, useMemo, useState } from "react";
import { apiSchool } from "../services";
import {
  DialogActiveSchool,
  DialogCreateSchool,
  PaginationTable,
  TableBase,
} from "../components";
import { TableCell, TableRow } from "@mui/material";
import { rolePtBr } from "../scripts";
import sortArray from "sort-array";

interface iViewSchoolProps extends iViewBaseProps {
  is_director?: () => "" | "&is_director=true" | "&is_director=false";
  onClickReset?: () => void;
  server_id?: string;
}

export const ViewSchool = ({
  is_director,
  onClickReset,
  search,
  server_id,
}: iViewSchoolProps) => {
  const navigate = useNavigate();
  const { debounce } = useDebounce();
  const { mdDown } = useAppThemeContext();
  const { handleOpenActive } = useDialogContext();
  const { query, setIsLoading, setCount, handlePage, page, order, by } =
    usePaginationContext();
  const [listData, setListData] = useState<iSchool[]>();
  const [data, setData] = useState<iSchool>();

  const onClick = () => getSchools(define_query(handlePage(page)), true);

  const list = useMemo(() => {
    if (listData) {
      if (order && by) {
        return sortArray<iSchool>(listData, { by: order, order: by });
      }
      return listData;
    }
  }, [by, listData, order]);

  const getSchools = useCallback((query: string, isPage?: boolean) => {
    setIsLoading(true);
    if (isPage) {
      apiSchool
        .list(query)
        .then((res) => setListData((old) => old?.concat(res.result)))
        .finally(() => setIsLoading(false));
    } else {
      apiSchool
        .list(query)
        .then((res) => {
          handlePage(0);
          setListData(res.result);
          setCount(res.total);
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  const define_query = useCallback(
    (comp: string) => {
      let query_data = query() + comp + "&order=name";
      if (is_director) query_data += is_director();
      if (server_id) query_data += `&server_id=${server_id}`;
      return query_data;
    },
    [is_director, query, server_id]
  );

  useEffect(() => {
    let query_data = "";
    if (search) {
      query_data += `&name=${search}`;
      debounce(() => {
        getSchools(define_query(query_data));
      });
    } else getSchools(define_query(query_data));
  }, [define_query, search]);

  const headCells: iheadCell[] = useMemo(() => {
    if (server_id)
      return [
        { order: "name", numeric: false, label: "Escola" },
        { numeric: false, label: "Função" },
        { numeric: false, label: "Tela" },
      ];
    return [
      { order: "name", numeric: false, label: "Escola" },
      { order: "", numeric: false, label: "Diretor" },
    ];
  }, [server_id]);

  const table = useMemo(() => {
    if (server_id)
      return (
        <TableBase headCells={headCells} message="Nenhuma escola encotrada">
          {list?.map((school) => (
            <TableRow key={school.id} hover sx={{ cursor: "pointer" }}>
              <TableCell>{school.name}</TableCell>
              <TableCell>{rolePtBr(school.server.role)}</TableCell>
              <TableCell>
                {school.server.dash === "SCHOOL" ? "Escola" : "Frequência"}
              </TableCell>
            </TableRow>
          ))}
        </TableBase>
      );
    return (
      <TableBase headCells={headCells} message="Nenhuma escola encotrada">
        {listData?.map((school) => (
          <TableRow
            key={school.id}
            hover
            sx={{ cursor: "pointer" }}
            onClick={() => {
              if (!school.is_active) {
                setData(school);
                handleOpenActive();
              } else {
                if (onClickReset) onClickReset();
                navigate("/school/" + school.id);
              }
            }}
          >
            <TableCell>{school.name}</TableCell>
            <TableCell>{school.director?.name}</TableCell>
          </TableRow>
        ))}
      </TableBase>
    );
  }, [server_id, headCells, mdDown, listData]);

  return (
    <>
      {table}
      <PaginationTable onClick={onClick} />
      <DialogCreateSchool />
      {data && <DialogActiveSchool school={data} />}
    </>
  );
};
