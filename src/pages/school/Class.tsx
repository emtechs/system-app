import { iClassSchoolList, iheadCell } from "../../shared/interfaces";
import {
  useAppThemeContext,
  useAuthContext,
  useDrawerContext,
  useFrequencyContext,
  usePaginationContext,
} from "../../shared/contexts";
import { useEffect, useState } from "react";
import { apiClass } from "../../shared/services";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { TableBase, Tools } from "../../shared/components";
import { Chip, TableCell, TableRow } from "@mui/material";
import { defineBgColorInfrequency } from "../../shared/scripts";
import { LayoutSchoolPage } from "./Layout";
import { useDebounce } from "../../shared/hooks";
import { Workspaces } from "@mui/icons-material";

interface iCardClassProps {
  el: iClassSchoolList;
}
const CardClass = ({ el }: iCardClassProps) => {
  const { theme, mdDown } = useAppThemeContext();
  const navigate = useNavigate();
  return (
    <TableRow
      hover
      sx={{ cursor: "pointer" }}
      onClick={() => {
        navigate(`/school/student?class_id=${el.class.id}&back=/school/class`);
      }}
    >
      <TableCell>{el.class.name}</TableCell>
      {!mdDown && (
        <>
          <TableCell align="right">{el._count.students}</TableCell>
          <TableCell align="right">{el._count.frequencies}</TableCell>
        </>
      )}
      <TableCell
        align="right"
        sx={{
          color: "#fff",
          bgcolor: defineBgColorInfrequency(el.infrequency, theme),
        }}
      >
        {String(el.infrequency).replace(".", ",")}%
      </TableCell>
    </TableRow>
  );
};

export const ListClassSchoolPage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { debounce } = useDebounce();
  const { mdDown } = useAppThemeContext();
  const { yearData, dashData, schoolData } = useAuthContext();
  const { isInfreq } = useFrequencyContext();
  const { handleClickClass } = useDrawerContext();
  const { setCount, setIsLoading, defineQuery } = usePaginationContext();
  const [data, setData] = useState<iClassSchoolList[]>();
  const [search, setSearch] = useState<string>();

  const headCells: iheadCell[] = mdDown
    ? [
        { order: "name", numeric: false, label: "Turma" },
        { order: "infreq", numeric: true, label: "Infrequência" },
      ]
    : [
        { order: "name", numeric: false, label: "Turma" },
        { numeric: true, label: "Alunos" },
        { numeric: true, label: "Frequências" },
        { order: "infreq", numeric: true, label: "Infrequência" },
      ];

  let school_id = "";
  if (id) {
    school_id = id;
  } else if (schoolData) school_id = schoolData.id;

  useEffect(() => {
    let query = defineQuery(undefined, school_id) + "&is_active=true";
    if (isInfreq) query += "&infreq=31";
    if (yearData) {
      if (search) {
        query += `&name=${search}`;
        setIsLoading(true);
        debounce(() => {
          apiClass
            .listSchool(yearData.id, query)
            .then((res) => {
              setData(res.result);
              setCount(res.total);
            })
            .finally(() => setIsLoading(false));
        });
      } else {
        setIsLoading(true);
        apiClass
          .listSchool(yearData.id, query)
          .then((res) => {
            setData(res.result);
            setCount(res.total);
          })
          .finally(() => setIsLoading(false));
      }
    }
  }, [school_id, yearData, isInfreq, defineQuery, search]);

  if (dashData !== "ADMIN" && school_id.length === 0)
    return <Navigate to="/" />;

  return (
    <LayoutSchoolPage
      title={
        <Chip
          label="Turmas"
          color="primary"
          icon={<Workspaces sx={{ mr: 0.5 }} fontSize="inherit" />}
        />
      }
      tools={
        <Tools
          isBack={dashData === "ADMIN"}
          back={"/school?id=" + school_id}
          isNew={dashData === "ADMIN"}
          destNew={"/class/define/school?id=" + school_id}
          onClickNew={handleClickClass}
          isSearch
          search={search}
          setSearch={(text) => setSearch(text)}
          isFreq
        />
      }
    >
      <TableBase headCells={headCells}>
        {data?.map((el, index) => (
          <CardClass key={index} el={el} />
        ))}
      </TableBase>
    </LayoutSchoolPage>
  );
};
