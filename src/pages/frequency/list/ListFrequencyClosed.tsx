import { TableCell, TableRow, Typography, useTheme } from "@mui/material";
import { TableFrequency, Tools } from "../../../shared/components";
import {
  useAppThemeContext,
  useAuthContext,
  useTableContext,
} from "../../../shared/contexts";
import { useEffect, useState } from "react";
import { apiUsingNow } from "../../../shared/services";
import { iFrequency } from "../../../shared/interfaces";
import { LayoutBasePage } from "../../../shared/layouts";
import { defineBgColorInfrequency } from "../../../shared/scripts";

interface iCardFrequencyProps {
  freq: iFrequency;
}

const CardFrequency = ({ freq }: iCardFrequencyProps) => {
  const theme = useTheme();

  return (
    <TableRow>
      <TableCell>{freq.date}</TableCell>
      <TableCell>{freq.class.class.name}</TableCell>
      <TableCell>{freq._count.students}</TableCell>
      <TableCell>{freq.class.school.name}</TableCell>
      <TableCell
        sx={{
          color: "#fff",
          bgcolor: defineBgColorInfrequency(
            freq.infrequency ? freq.infrequency : 0,
            theme
          ),
        }}
      >
        {String(freq.infrequency).replace(".", ",")}%
      </TableCell>
    </TableRow>
  );
};

export const ListFrequencyClosedAdm = () => {
  const { setLoading } = useAppThemeContext();
  const { yearId } = useAuthContext();
  const { setCount, take, skip } = useTableContext();
  const [data, setData] = useState<iFrequency[]>();

  useEffect(() => {
    if (yearId) {
      let query = `?year_id=${yearId}&status=CLOSED&is_infreq=true`;
      if (take) query += `&take=${take}`;
      if (skip) query += `&skip=${skip}`;
      setLoading(true);
      apiUsingNow
        .get<{ total: number; result: iFrequency[] }>(`frequencies${query}`)
        .then((res) => {
          setCount(res.data.total);
          setData(res.data.result);
        })
        .finally(() => setLoading(false));
    }
  }, [yearId, take, skip]);
  return (
    <LayoutBasePage title="Frequências Realizadas" tools={<Tools isHome />}>
      {data && data.length > 0 ? (
        <TableFrequency isClosed>
          <>
            {data.map((el) => (
              <CardFrequency key={el.id} freq={el} />
            ))}
          </>
        </TableFrequency>
      ) : (
        <Typography m={2}>Nenhuma frequência realizada no momento!</Typography>
      )}
    </LayoutBasePage>
  );
};
