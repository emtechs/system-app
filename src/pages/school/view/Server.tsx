import { Navigate, useParams } from "react-router-dom";
import { useDebounce } from "../../../shared/hooks";
import {
  useAppThemeContext,
  useDialogContext,
  usePaginationContext,
  useSchoolContext,
} from "../../../shared/contexts";
import { useCallback, useEffect, useState } from "react";
import {
  DialogCreateServer,
  PaginationMobile,
  RemoveUser,
  TableBase,
} from "../../../shared/components";
import { TableCell, TableRow } from "@mui/material";
import { iSchoolServer, iheadCell } from "../../../shared/interfaces";
import { rolePtBr } from "../../../shared/scripts";
import { apiSchool } from "../../../shared/services";

export const ViewSchoolServer = () => {
  const { school_id } = useParams();
  const { debounce } = useDebounce();
  const { mdDown } = useAppThemeContext();
  const { handleOpenActive } = useDialogContext();
  const { defineQuery, query, setIsLoading, setCount, define_step } =
    usePaginationContext();
  const { search, schoolRetrieve } = useSchoolContext();
  const [data, setData] = useState<iSchoolServer[]>();
  const [work, setWork] = useState<iSchoolServer>();

  const getServers = useCallback(
    (id: string, query: string, take: number) => {
      if (mdDown) {
        setIsLoading(true);
        apiSchool
          .listServers(id, query)
          .then((res) => {
            setData(res.result);
            setCount(res.total);
            define_step(res.total, take);
          })
          .finally(() => setIsLoading(false));
      } else {
        setIsLoading(true);
        apiSchool
          .listServers(id, query)
          .then((res) => {
            setData(res.result);
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
    if (school_id) {
      const take = 5;
      let query = queryData(take);
      if (search) {
        query += `&name=${search}`;
        debounce(() => {
          getServers(school_id, query, take);
        });
      } else {
        getServers(school_id, query, take);
      }
    }
  }, [school_id, queryData, search]);

  const headCells: iheadCell[] = mdDown
    ? [
        { order: "name", numeric: false, label: "Nome Completo" },
        { numeric: false, label: "CPF" },
      ]
    : [
        { order: "name", numeric: false, label: "Nome Completo" },
        { numeric: false, label: "CPF" },
        { numeric: false, label: "Função" },
        { numeric: false, label: "Tela" },
      ];

  if (!school_id) return <Navigate to="/school" />;

  return (
    <>
      <TableBase
        headCells={headCells}
        is_pagination={mdDown ? false : undefined}
      >
        {data?.map((schoolServer) => (
          <TableRow
            key={schoolServer.server.id}
            hover
            sx={{ cursor: "pointer" }}
            onClick={() => {
              setWork(schoolServer);
              handleOpenActive();
            }}
          >
            <TableCell>{schoolServer.server.name}</TableCell>
            <TableCell>{schoolServer.server.cpf}</TableCell>
            {!mdDown && <TableCell>{rolePtBr(schoolServer.role)}</TableCell>}
            {!mdDown && (
              <TableCell>
                {schoolServer.dash === "SCHOOL" ? "Escola" : "Frequência"}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBase>
      {mdDown && <PaginationMobile />}
      {schoolRetrieve && (
        <DialogCreateServer school={schoolRetrieve} getServers={getServers} />
      )}
      {schoolRetrieve && work && (
        <RemoveUser
          school={schoolRetrieve}
          work={work}
          getServers={getServers}
        />
      )}
    </>
  );
};
