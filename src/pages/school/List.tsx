import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TableCell, TableRow, useTheme } from "@mui/material";
import { TableBase, Tools } from "../../shared/components";
import {
  useAuthContext,
  useFrequencyContext,
  useTableContext,
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
  { order: "infreq", numeric: true, label: "Infrequência" },
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
      <TableCell>{school.director?.name}</TableCell>
      <TableCell align="right">{school.num_classes}</TableCell>
      <TableCell align="right">{school.num_students}</TableCell>
      <TableCell align="right">{school.num_frequencies}</TableCell>
      <TableCell
        align="right"
        sx={{
          color: "#fff",
          bgcolor: defineBgColorInfrequency(school.infreq, theme),
        }}
      >
        {String(school.infreq).replace(".", ",")}%
      </TableCell>
    </TableRow>
  );
};

export const ListSchoolPage = () => {
  const { debounce } = useDebounce();
  const { yearData } = useAuthContext();
  const { isInfreq } = useFrequencyContext();
  const { setCount, setIsLoading, defineQuery } = useTableContext();
  const [listSchoolData, setListSchoolData] = useState<iSchoolList[]>();
  const [search, setSearch] = useState<string>();

  useEffect(() => {
    if (yearData) {
      let query = defineQuery(yearData.id);
      query += "&is_listSchool=true&is_active=true";
      if (isInfreq) {
        query += "&infreq=31";
      }
      if (search) {
        query += `&name=${search}`;
        setIsLoading(true);
        debounce(() => {
          apiSchool
            .list(query)
            .then((res) => {
              setListSchoolData(res.result);
              setCount(res.total);
            })
            .finally(() => setIsLoading(false));
        });
      } else {
        setIsLoading(true);
        apiSchool
          .list(query)
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
      title="Listagem de Escolas"
      tools={
        <Tools
          isHome
          isNew
          isSearch
          search={search}
          setSearch={(text) => setSearch(text)}
          destNew="/school/create?back=/school/list?order=name"
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
