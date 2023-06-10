import { TableCell, TableRow, Typography } from "@mui/material";
import { TableFrequency, Tools } from "../../../shared/components";
import { useAppThemeContext, useAuthContext } from "../../../shared/contexts";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiUsingNow } from "../../../shared/services";
import { iFrequency } from "../../../shared/interfaces";
import { LayoutBasePage } from "../../../shared/layouts";
import { CardSchool } from "../../../shared/components/card";

interface iCardFrequencyProps {
  freq: iFrequency;
}

const CardFrequency = ({ freq }: iCardFrequencyProps) => {
  const navigate = useNavigate();

  return (
    <TableRow
      hover
      sx={{ cursor: "pointer" }}
      onClick={() => navigate(`/frequency/${freq.id}`)}
    >
      <TableCell>{freq.date}</TableCell>
      <TableCell>{freq.class.class.name}</TableCell>
      <TableCell>{freq._count.students}</TableCell>
      <TableCell>{freq.class.school.name}</TableCell>
    </TableRow>
  );
};

export const ListFrequencyCommon = () => {
  const { setLoading } = useAppThemeContext();
  const { schoolData } = useAuthContext();
  const [data, setData] = useState<iFrequency[]>();

  useEffect(() => {
    setLoading(true);
    apiUsingNow
      .get<iFrequency[]>(
        `frequencies?status=OPENED&school_id=${schoolData?.school.id}`
      )
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, [schoolData]);

  return (
    <LayoutBasePage
      title="Frequências em Aberto"
      school={<CardSchool />}
      tools={<Tools isHome />}
    >
      {data && data.length > 0 ? (
        <TableFrequency>
          <>
            {data.map((el) => (
              <CardFrequency key={el.id} freq={el} />
            ))}
          </>
        </TableFrequency>
      ) : (
        <Typography m={2}>Nenhuma frequência em aberto no momento!</Typography>
      )}
    </LayoutBasePage>
  );
};
