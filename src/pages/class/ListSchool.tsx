import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Chip, TableCell, TableRow } from "@mui/material";
import { TableBase, TitleAdminDashPages, Tools } from "../../shared/components";
import {
  useAppThemeContext,
  useAuthContext,
  usePaginationContext,
} from "../../shared/contexts";
import { iSchool, iheadCell } from "../../shared/interfaces";
import { apiSchool } from "../../shared/services";
import { useDebounce } from "../../shared/hooks";
import { LayoutBasePage } from "../../shared/layouts";
import { SchoolTwoTone } from "@mui/icons-material";
import { defineBgColorInfrequency } from "../../shared/scripts";

const headCells: iheadCell[] = [
  { order: "name", numeric: false, label: "Escola" },
  { order: "director_name", numeric: false, label: "Diretor" },
  { numeric: true, label: "Turmas" },
  { numeric: true, label: "Alunos" },
  { numeric: true, label: "Frequências" },
  { numeric: true, label: "Infrequência" },
];

interface iCardSchoolProps {
  school: iSchool;
}

const CardSchool = ({ school }: iCardSchoolProps) => {
  const navigate = useNavigate();
  const { theme } = useAppThemeContext();

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
      <TableCell align="right">{school.classes}</TableCell>
      <TableCell align="right">{school.students}</TableCell>
      <TableCell align="right">{school.frequencies}</TableCell>
      <TableCell
        align="right"
        sx={{
          color: "#fff",
          bgcolor: defineBgColorInfrequency(school.infrequency, theme),
        }}
      >
        {school.infrequency.toFixed(0)}%
      </TableCell>
    </TableRow>
  );
};

export const ListSchoolPage = () => {
  const { debounce } = useDebounce();
  const { yearData } = useAuthContext();
  const { setCount, setIsLoading, query, search } = usePaginationContext();
  const [listSchoolData, setListSchoolData] = useState<iSchool[]>();
  const [infreq, setInfreq] = useState<string>();

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
      let query_data = query(yearData.id);
      if (search) {
        query_data += `&name=${search}`;
        if (infreq) query_data += `&infreq=${infreq}`;
        debounce(() => {
          getSchool(query_data);
        });
      } else if (infreq) {
        query_data += `&infreq=${infreq}`;
        if (search) query_data += `&name=${search}`;
        debounce(() => {
          getSchool(query_data);
        });
      } else getSchool(query_data);
    }
  }, [yearData, query, search, infreq]);

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
          isSearch
          titleNew="Nova"
          isInfreq
          infreq={infreq}
          setInfreq={(text) => setInfreq(text)}
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
