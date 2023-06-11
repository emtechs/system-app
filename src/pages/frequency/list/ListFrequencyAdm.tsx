import { TableCell, TableRow } from "@mui/material";
import { TableBase } from "../../../shared/components";
import { useTableContext } from "../../../shared/contexts";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiUsingNow } from "../../../shared/services";
import { iFrequency, iheadCell } from "../../../shared/interfaces";
import { LayoutBasePage } from "../../../shared/layouts";

const headCells: iheadCell[] = [
  { order: "date", numeric: false, label: "Data" },
  { order: "name", numeric: false, label: "Turma" },
  { numeric: true, label: "Alunos" },
  { order: "name", numeric: false, label: "Escola" },
];

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

export const ListFrequencyAdm = () => {
  const { setIsLoading } = useTableContext();
  const [data, setData] = useState<iFrequency[]>();

  useEffect(() => {
    setIsLoading(true);
    apiUsingNow
      .get<iFrequency[]>("frequencies?status=OPENED")
      .then((res) => setData(res.data))
      .finally(() => setIsLoading(false));
  }, []);
  return (
    <LayoutBasePage title="Frequências em Aberto">
      <TableBase headCells={headCells}>
        {data?.map((el) => (
          <CardFrequency key={el.id} freq={el} />
        ))}
      </TableBase>
    </LayoutBasePage>
  );
};
