import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Chip, TableCell, TableRow } from "@mui/material";
import { TableBase, TitleAdminDashPages, Tools } from "../../shared/components";
import {
  useAuthContext,
  usePaginationContext,
  useSchoolContext,
} from "../../shared/contexts";
import { iSchool, iheadCell } from "../../shared/interfaces";
import { apiSchool } from "../../shared/services";
import { useDebounce } from "../../shared/hooks";
import { LayoutBasePage } from "../../shared/layouts";
import { SchoolTwoTone } from "@mui/icons-material";

const headCells: iheadCell[] = [
  { order: "name", numeric: false, label: "Escola" },
  { order: "director_name", numeric: false, label: "Diretor" },
];

interface iCardSchoolProps {
  school: iSchool;
}

const CardSchool = ({ school }: iCardSchoolProps) => {
  const navigate = useNavigate();

  return (
    <TableRow
      hover
      sx={{ cursor: "pointer" }}
      onClick={() => {
        navigate(`/school?id=${school.id}`);
      }}
    >
      <TableCell>{school.name}</TableCell>
      <TableCell>{school.director?.name}</TableCell>
    </TableRow>
  );
};

export const ListSchoolPage = () => {
  const { debounce } = useDebounce();
  const { yearData } = useAuthContext();
  const { is_director, setDirector } = useSchoolContext();
  const { setCount, setIsLoading, defineQuery } = usePaginationContext();
  const [listSchoolData, setListSchoolData] = useState<iSchool[]>();
  const [search, setSearch] = useState<string>();

  const getSchool = useCallback((query: string) => {
    setIsLoading(true);
    apiSchool
      .list(query)
      .then((res) => {
        setListSchoolData(res.result);
        setCount(res.total);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (yearData) {
      let query = defineQuery() + is_director() + "&is_active=true";
      if (search) {
        query += `&name=${search}`;
        debounce(() => {
          getSchool(query);
        });
      } else getSchool(query);
    }
  }, [yearData, defineQuery, is_director, search]);

  const breadcrumbs = [
    <Chip
      label="Listar"
      color="primary"
      icon={<SchoolTwoTone sx={{ mr: 0.5 }} fontSize="inherit" />}
    />,
  ];

  return (
    <LayoutBasePage
      title={<TitleAdminDashPages breadcrumbs={breadcrumbs} />}
      tools={
        <Tools
          isHome
          isNew
          isSearch
          search={search}
          setSearch={(text) => setSearch(text)}
          isDirector
          destNew="/school/create?back=/school/list"
          titleNew="Nova"
          onClickReset={() => {
            setSearch(undefined);
            setDirector([true, true]);
          }}
        />
      }
    >
      <TableBase headCells={headCells}>
        {listSchoolData?.map((el) => (
          <CardSchool key={el.id} school={el} />
        ))}
      </TableBase>
    </LayoutBasePage>
  );
};
