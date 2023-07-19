import { useMemo } from "react";
import { useAppThemeContext } from "../../../contexts";
import { iClass, iHeadcell } from "../../../interfaces";
import { TableBase, TableCellLink, TableRowLink } from "../../../components";
import { defineBgColorInfrequency } from "../../../scripts";

interface iTableClassSchoolProps {
  data: iClass[];
}

export const TableClassSchool = ({ data }: iTableClassSchoolProps) => {
  const { mdDown, theme } = useAppThemeContext();

  const headCells: iHeadcell[] = useMemo(() => {
    if (mdDown)
      return [
        { order: "name", numeric: "left", label: "Turma" },
        { numeric: "left", label: "Escola" },
        { order: "infrequency", numeric: "right", label: "Infrequência" },
      ];
    return [
      { order: "name", numeric: "left", label: "Turma" },
      { order: "students", numeric: "right", label: "Alunos" },
      { order: "frequencies", numeric: "right", label: "Frequências" },
      { order: "infrequency", numeric: "right", label: "Infrequência" },
    ];
  }, [mdDown]);

  return (
    <TableBase headCells={headCells} link="div">
      {data.map((el, index) => (
        <TableRowLink
          key={index}
          href={`/class/${el.id}?school_id=${el.school.id}`}
        >
          <TableCellLink link="div">{el.name}</TableCellLink>
          {!mdDown && (
            <>
              <TableCellLink link="div" numeric="right">
                {el.students}
              </TableCellLink>
              <TableCellLink link="div" numeric="right">
                {el.frequencies}
              </TableCellLink>
            </>
          )}
          <TableCellLink
            link="div"
            numeric="right"
            sx={{
              color: "#fff",
              bgcolor: defineBgColorInfrequency(el.infrequency, theme),
            }}
          >
            {el.infrequency > 0 ? el.infrequency.toFixed(0) : 0}%
          </TableCellLink>
        </TableRowLink>
      ))}
    </TableBase>
  );
};
