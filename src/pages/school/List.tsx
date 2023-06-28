import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TableCell, TableRow, useTheme } from "@mui/material";
import { TableBase, Tools } from "../../shared/components";
import {
  useAuthContext,
  useFrequencyContext,
  usePaginationContext,
} from "../../shared/contexts";
import { iSchoolList, iheadCell } from "../../shared/interfaces";
import { apiSchool } from "../../shared/services";
import { defineBgColorInfrequency } from "../../shared/scripts";
import { useDebounce } from "../../shared/hooks";
import { LayoutSchoolPage } from "./Layout";

const headCells: iheadCell[] = [
  { order: "name", numeric: false, label: "Escola" },
  { order: "director_name", numeric: false, label: "Diretor" },
  { numeric: true, label: "Turmas" },
  { numeric: true, label: "Alunos" },
  { numeric: true, label: "Frequências" },
  { numeric: true, label: "Infrequência" },
];

interface iCardSchoolProps {
  school: iSchoolList;
}

const CardSchool = ({ school }: iCardSchoolProps) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <TableRow
      hover
      sx={{ cursor: "pointer" }}
      onClick={() => {
        navigate(`/school?id=${school.id}&order=name`);
      }}
    >
      <TableCell>{school.name}</TableCell>
      <TableCell>{school.director}</TableCell>
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
  const { isInfreq } = useFrequencyContext();
  const { setCount, setIsLoading, defineQuery } = usePaginationContext();
  const [listSchoolData, setListSchoolData] = useState<iSchoolList[]>();
  const [search, setSearch] = useState<string>();

  useEffect(() => {
    if (yearData) {
      let query = defineQuery(yearData.id);
      if (isInfreq) {
        query += "&infreq=31";
      }
      if (search) {
        query += `&name=${search}`;
        setIsLoading(true);
        debounce(() => {
          apiSchool
            .list(yearData.id, query)
            .then((res) => {
              setListSchoolData(res.result);
              setCount(res.total);
            })
            .finally(() => setIsLoading(false));
        });
      } else {
        setIsLoading(true);
        apiSchool
          .list(yearData.id, query)
          .then((res) => {
            setListSchoolData(res.result);
            setCount(res.total);
          })
          .finally(() => setIsLoading(false));
      }
    }
  }, [yearData, defineQuery, search, isInfreq]);

  return (
    <LayoutSchoolPage
      title=""
      tools={
        <Tools
          isHome
          isNew
          isSearch
          search={search}
          setSearch={(text) => setSearch(text)}
          destNew="/school/create?back=/school/list"
          titleNew="Nova"
          isFreq
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
