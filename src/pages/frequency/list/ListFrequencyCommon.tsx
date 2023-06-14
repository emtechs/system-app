import { TableCell, TableRow } from "@mui/material";
import { TableBase, Tools } from "../../../shared/components";
import { useAuthContext, useTableContext } from "../../../shared/contexts";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiUsingNow } from "../../../shared/services";
import { iFrequency, iheadCell } from "../../../shared/interfaces";
import { LayoutBasePage } from "../../../shared/layouts";
import { CardSchool } from "../../../shared/components/card";

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

export const ListFrequencyCommon = () => {
  const { schoolData } = useAuthContext();
  const { setIsLoading } = useTableContext();
  const [data, setData] = useState<iFrequency[]>();

  useEffect(() => {
    setIsLoading(true);
    apiUsingNow
      .get<iFrequency[]>(
        `frequencies?status=OPENED&school_id=${schoolData?.school.id}`
      )
      .then((res) => setData(res.data))
      .finally(() => setIsLoading(false));
  }, [schoolData]);

  return (
    <LayoutBasePage
      title="Frequências em Aberto"
      school={<CardSchool />}
      tools={<Tools isSingle />}
    >
      <TableBase headCells={headCells}>
        {data?.map((el) => (
          <CardFrequency key={el.id} freq={el} />
        ))}
      </TableBase>
    </LayoutBasePage>
  );
};
