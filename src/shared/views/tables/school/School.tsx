import { Fragment, useMemo, useState } from "react";
import { Link as LinkComp, TableRow } from "@mui/material";
import {
  DialogActiveSchool,
  DialogCreateSchool,
  TableBase,
  TableCellLink,
} from "../../../components";
import { iSchool, iheadCell } from "../../../interfaces";
import { useDialogContext, usePaginationContext } from "../../../contexts";

interface iTableSchoolProps {
  data: iSchool[];
}

export const TableSchool = ({ data }: iTableSchoolProps) => {
  const { onClickReset } = usePaginationContext();
  const { handleOpenActive } = useDialogContext();
  const [dataSchool, setDataSchool] = useState<iSchool>();

  const onClick = (school: iSchool) => {
    if (!school.is_active) {
      setDataSchool(school);
      handleOpenActive();
    } else onClickReset();
  };

  const headCells: iheadCell[] = useMemo(() => {
    return [
      { order: "name", numeric: "left", label: "Escola" },
      { order: "classes", numeric: "right", label: "Turmas" },
      { order: "students", numeric: "right", label: "Alunos" },
      { order: "frequencies", numeric: "right", label: "Frequências" },
      { order: "servers", numeric: "right", label: "Servidores" },
      { order: "director_name", numeric: "left", label: "Diretor" },
    ];
  }, []);

  return (
    <>
      <TableBase
        headCells={headCells}
        message="Nenhuma escola encotrada"
        link="div"
      >
        {data.map((school) => (
          <Fragment key={school.id}>
            <TableRow
              hover
              underline="none"
              href={school.is_active ? `/school/${school.id}` : ""}
              component={LinkComp}
              onClick={() => onClick(school)}
            >
              <TableCellLink link="div">{school.name}</TableCellLink>
              <TableCellLink link="div" numeric="right">
                {school.classes}
              </TableCellLink>
              <TableCellLink link="div" numeric="right">
                {school.students}
              </TableCellLink>
              <TableCellLink link="div" numeric="right">
                {school.frequencies}
              </TableCellLink>
              <TableCellLink link="div" numeric="right">
                {school.servers}
              </TableCellLink>
              <TableCellLink link="div">{school.director?.name}</TableCellLink>
            </TableRow>
          </Fragment>
        ))}
      </TableBase>
      <DialogCreateSchool />
      {dataSchool && <DialogActiveSchool school={dataSchool} />}
    </>
  );
};
