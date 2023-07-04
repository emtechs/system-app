import { useCallback, useEffect, useState } from "react";
import {
  useAppThemeContext,
  useDialogContext,
  usePaginationContext,
  useSchoolContext,
} from "../../../shared/contexts";
import { useDebounce } from "../../../shared/hooks";
import { iSchool, iheadCell } from "../../../shared/interfaces";
import { TableCell, TableRow } from "@mui/material";
import {
  DialogActiveSchool,
  DialogCreateSchool,
  PaginationMobile,
  TableBase,
} from "../../../shared/components";
import { useNavigate } from "react-router-dom";
import { apiSchool } from "../../../shared/services";

export const ViewSchool = () => {
  const navigate = useNavigate();
  const { debounce } = useDebounce();
  const { mdDown } = useAppThemeContext();
  const { handleOpenActive } = useDialogContext();
  const { search, is_director, onClickReset } = useSchoolContext();
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
      let query_data = defineQuery() + is_director();
      if (mdDown) {
        query_data = query(take) + is_director();
        return query_data;
      }
      return query_data;
    },
    [defineQuery, query, is_director, mdDown]
  );

  useEffect(() => {
    const take = 5;
    let query = queryData(take);
    if (search) {
      query += `&name=${search}`;
      debounce(() => {
        getSchools(query, take);
      });
    } else getSchools(query, take);
  }, [queryData, is_director, search]);

  const headCells: iheadCell[] = [
    { order: "name", numeric: false, label: "Escola" },
    { order: "director_name", numeric: false, label: "Diretor" },
  ];

  return (
    <>
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
                onClickReset();
                navigate("/school/" + school.id);
              }
            }}
          >
            <TableCell>{school.name}</TableCell>
            <TableCell>{school.director?.name}</TableCell>
          </TableRow>
        ))}
      </TableBase>
      {mdDown && <PaginationMobile />}
      <DialogCreateSchool />
      {data && <DialogActiveSchool school={data} />}
    </>
  );
};
