import { TableCell, TableRow, Typography, useTheme } from "@mui/material";
import {
  useAppThemeContext,
  useAuthContext,
  useFrequencyContext,
  useSchoolContext,
  useTableContext,
} from "../../shared/contexts";
import { useEffect, useState } from "react";
import { iSchoolList } from "../../shared/interfaces";
import { apiUsingNow } from "../../shared/services";
import { LayoutBasePage } from "../../shared/layouts";
import { TableSchool, Tools } from "../../shared/components";
import { defineBgColorInfrequency } from "../../shared/scripts";
import { useNavigate, useSearchParams } from "react-router-dom";

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
  const { setLoading } = useAppThemeContext();
  const { yearId } = useAuthContext();
  const { updateSchoolData } = useSchoolContext();
  const { isInfreq } = useFrequencyContext();
  const { setCount, take, skip, order, setOrder, by } = useTableContext();
  const [listSchoolData, setListSchoolData] = useState<iSchoolList[]>();

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
      setLoading(true);
      apiUsingNow
        .get<{ total: number; result: iSchoolList[] }>(`schools${query}`)
        .then((res) => {
          setListSchoolData(res.data.result);
          setCount(res.data.total);
        })
        .finally(() => setLoading(false));
    }
  }, [yearId, updateSchoolData, isInfreq, take, skip, orderData, order, by]);

  return (
    <LayoutBasePage
      title="Listagem de Escolas"
      tools={
        <Tools
          isHome
          isNew
          destNew="/school/create?back=/school/list?order=name"
          titleNew="Nova"
          isFreq
        />
      }
    >
      {listSchoolData && listSchoolData.length > 0 ? (
        <TableSchool>
          <>
            {listSchoolData.map((el) => (
              <CardSchool key={el.id} school={el} />
            ))}
          </>
        </TableSchool>
      ) : (
        <>
          {isInfreq ? (
            <Typography m={2}>
              Nenhuma escola infrequente no momento!
            </Typography>
          ) : (
            <Typography m={2}>Nenhuma escola ativa no momento!</Typography>
          )}
        </>
      )}
    </LayoutBasePage>
  );
};
