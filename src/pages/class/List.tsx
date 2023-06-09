import { iClassWithSchool } from "../../shared/interfaces";
import { useAppThemeContext } from "../../shared/contexts";
import { useEffect, useState } from "react";
import { apiUsingNow } from "../../shared/services";
import { useNavigate, useParams } from "react-router-dom";
import { LayoutBasePage } from "../../shared/layouts";
import { TableClass, Tools } from "../../shared/components";
import { TableCell, TableRow } from "@mui/material";
import { CardSchoolId } from "../../shared/components/card";

interface iCardClassProps {
  el: iClassWithSchool;
}
const CardClass = ({ el }: iCardClassProps) => {
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
      <TableCell>{el._count.students}</TableCell>
      <TableCell>{el._count.frequencies}</TableCell>
      <TableCell>{String(el.infrequency).replace(".", ",")}%</TableCell>
    </TableRow>
  );
};

export const ListClassPage = () => {
  const { school_id, year_id } = useParams();
  const { setLoading } = useAppThemeContext();
  const [data, setData] = useState<iClassWithSchool[]>();

  useEffect(() => {
    setLoading(true);
    apiUsingNow
      .get<iClassWithSchool[]>(
        `classes/${school_id}?year_id=${year_id}&is_active=true`
      )
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <LayoutBasePage
      title={"Listagem de Turmas"}
      school={<CardSchoolId school_id={school_id ? school_id : ""} />}
      tools={<Tools isHome isBack back={`/school/${school_id}`} />}
    >
      <TableClass>
        <>
          {data?.map((el) => (
            <CardClass key={el.class.id} el={el} />
          ))}
        </>
      </TableClass>
    </LayoutBasePage>
  );
};
