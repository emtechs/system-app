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
  PaginationMobile,
  TableBase,
} from "../components";
import { TableCell, TableRow } from "@mui/material";
import { rolePtBr } from "../scripts";

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
  const { query, defineQuery, setIsLoading, define_step, setCount } =
    usePaginationContext();
  const [listData, setListData] = useState<iSchool[]>();
  const [data, setData] = useState<iSchool>();

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
    if (is_director) query += is_director();
    if (server_id) query += `&server_id=${server_id}`;
    if (search) {
      query += `&name=${search}`;
      debounce(() => {
        getSchools(query, take);
      });
    } else getSchools(query, take);
  }, [queryData, search, is_director, server_id]);

  const headCells: iheadCell[] = useMemo(() => {
    if (server_id)
      return [
        { order: "name", numeric: false, label: "Escola" },
        { numeric: false, label: "Função" },
        { numeric: false, label: "Tela" },
      ];
    return [
      { order: "name", numeric: false, label: "Escola" },
      { order: "director_name", numeric: false, label: "Diretor" },
    ];
  }, [server_id]);

  const table = useMemo(() => {
    if (server_id)
      return (
        <TableBase
          headCells={headCells}
          message="Nenhuma escola encotrada"
          is_pagination={mdDown ? false : undefined}
        >
          {listData?.map((school) => (
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
      <TableBase
        headCells={headCells}
        message="Nenhuma escola encotrada"
        is_pagination={mdDown ? false : undefined}
      >
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
      {mdDown && <PaginationMobile />}
      <DialogCreateSchool />
      {data && <DialogActiveSchool school={data} />}
    </>
  );
};
