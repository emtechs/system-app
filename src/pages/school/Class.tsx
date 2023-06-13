import { iClassSchoolList, iheadCell } from "../../shared/interfaces";
import {
  useAuthContext,
  useFrequencyContext,
  useSchoolContext,
  useTableContext,
} from "../../shared/contexts";
import { useEffect, useState } from "react";
import { apiUsingNow } from "../../shared/services";
import { useNavigate, useSearchParams } from "react-router-dom";
import { TableBase, Tools } from "../../shared/components";
import { TableCell, TableRow, useTheme } from "@mui/material";
import { defineBgColorInfrequency } from "../../shared/scripts";
import { LayoutSchoolPage } from "./Layout";

const headCells: iheadCell[] = [
  { order: "name", numeric: false, label: "Turma" },
  { numeric: true, label: "Alunos" },
  { numeric: true, label: "Frequências" },
  { order: "infreq", numeric: true, label: "Infrequência" },
];

interface iCardClassProps {
  el: iClassSchoolList;
}
const CardClass = ({ el }: iCardClassProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <TableRow
      hover
      sx={{ cursor: "pointer" }}
      onClick={() =>
        navigate(`/class/${el.class.id}/${el.school.id}/${el.year.id}`)
      }
    >
      <TableCell>{el.class.name}</TableCell>
      <TableCell align="right">{el._count.students}</TableCell>
      <TableCell align="right">{el._count.frequencies}</TableCell>
      <TableCell
        align="right"
        sx={{
          color: "#fff",
          bgcolor: defineBgColorInfrequency(el.infreq, theme),
        }}
      >
        {String(el.infreq).replace(".", ",")}%
      </TableCell>
    </TableRow>
  );
};

export const ListClassSchoolPage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const orderData = searchParams.get("order");
  const { yearData } = useAuthContext();
  const { schoolSelect } = useSchoolContext();
  const { isInfreq } = useFrequencyContext();
  const { setCount, take, skip, setIsLoading, order, by, setOrder } =
    useTableContext();
  const [data, setData] = useState<iClassSchoolList[]>();
  let school_id = "";
  if (id) {
    school_id = id;
  } else if (schoolSelect) school_id = schoolSelect.id;

  useEffect(() => {
    let query = `?is_active=true&school_id=${school_id}&by=${by}`;
    if (take) query += `&take=${take}`;
    if (skip) query += `&skip=${skip}`;
    if (isInfreq) query += "&infreq=31";
    if (order) {
      query += `&order=${order}`;
    } else if (orderData) {
      setOrder(orderData);
      query += `&order=${orderData}`;
    }
    if (yearData) {
      setIsLoading(true);
      apiUsingNow
        .get<{ total: number; result: iClassSchoolList[] }>(
          `classes/year/${yearData?.id}${query}`
        )
        .then((res) => {
          setData(res.data.result);
          setCount(res.data.total);
        })
        .finally(() => setIsLoading(false));
    }
  }, [school_id, orderData, yearData, take, skip, order, by, isInfreq]);

  return (
    <LayoutSchoolPage
      title="Listagem de Turmas"
      isSchool
      tools={
        <Tools
          back={"/school?id=" + school_id + "&order=name"}
          isNew
          destNew={"/class/define/school?id=" + school_id}
          isFreq
        />
      }
    >
      <TableBase headCells={headCells}>
        {data?.map((el) => (
          <CardClass key={el.class.id} el={el} />
        ))}
      </TableBase>
    </LayoutSchoolPage>
  );
};
