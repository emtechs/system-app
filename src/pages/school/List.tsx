import { TableCell, TableRow, useTheme } from "@mui/material";
import {
  useAuthContext,
  useFrequencyContext,
  useSchoolContext,
  useTableContext,
} from "../../shared/contexts";
import { useEffect, useState } from "react";
import { iSchoolList, iheadCell } from "../../shared/interfaces";
import { apiUsingNow } from "../../shared/services";
import { TableBase, Tools } from "../../shared/components";
import { defineBgColorInfrequency } from "../../shared/scripts";
import { useNavigate, useSearchParams } from "react-router-dom";
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
        navigate(`/school/${school.id}`);
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
  const [searchParams] = useSearchParams();
  const orderData = searchParams.get("order");
  const { debounce } = useDebounce();
  const { yearId } = useAuthContext();
  const { updateSchoolData } = useSchoolContext();
  const { isInfreq } = useFrequencyContext();
  const { setCount, take, skip, order, setOrder, by, setIsLoading } =
    useTableContext();
  const [listSchoolData, setListSchoolData] = useState<iSchoolList[]>();
  const [search, setSearch] = useState<string>();

  useEffect(() => {
    if (yearId) {
      let query = `?year_id=${yearId}&is_listSchool=true&by=${by}&is_active=true`;
      if (order) {
        query += `&order=${order}`;
      } else if (orderData) {
        setOrder(orderData);
        query += `&order=${orderData}`;
      }
      if (isInfreq) query += "&infreq=31";
      if (take) query += `&take=${take}`;
      if (skip) query += `&skip=${skip}`;
      if (search) {
        query += `&name=${search}`;
        setIsLoading(true);
        debounce(() => {
          apiUsingNow
            .get<{ total: number; result: iSchoolList[] }>(`schools${query}`)
            .then((res) => {
              setListSchoolData(res.data.result);
              setCount(res.data.total);
            })
            .finally(() => setIsLoading(false));
        });
      } else {
        setIsLoading(true);
        apiUsingNow
          .get<{ total: number; result: iSchoolList[] }>(`schools${query}`)
          .then((res) => {
            setListSchoolData(res.data.result);
            setCount(res.data.total);
          })
          .finally(() => setIsLoading(false));
      }
    }
  }, [
    yearId,
    updateSchoolData,
    isInfreq,
    take,
    skip,
    orderData,
    order,
    by,
    search,
  ]);

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
