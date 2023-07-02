import { useNavigate } from "react-router-dom";
import { useAppThemeContext } from "../../../../shared/contexts";
import { iClassSchoolList, iheadCell } from "../../../../shared/interfaces";
import { Box, TableCell, TableRow } from "@mui/material";
import { PaginationMobile, TableBase } from "../../../../shared/components";
import { defineBgColorInfrequency } from "../../../../shared/scripts";

interface iTableClassProps {
  data?: iClassSchoolList[];
}

export const TableClass = ({ data }: iTableClassProps) => {
  const { mdDown, theme } = useAppThemeContext();
  const navigate = useNavigate();

  const headCells: iheadCell[] = mdDown
    ? [
        { order: "name", numeric: false, label: "Turma" },
        { order: "infreq", numeric: true, label: "Infrequência" },
      ]
    : [
        { order: "name", numeric: false, label: "Turma" },
        { numeric: true, label: "Alunos" },
        { numeric: true, label: "Frequências" },
        { order: "infreq", numeric: true, label: "Infrequência" },
      ];

  return (
    <Box flex={1}>
      <TableBase
        headCells={headCells}
        is_pagination={mdDown ? false : undefined}
      >
        {data?.map((el) => (
          <TableRow
            key={el.id}
            hover
            sx={{ cursor: "pointer" }}
            onClick={() => {
              navigate(`/school/student?class_id=${el.id}&back=/school/class`);
            }}
          >
            <TableCell>{el.name}</TableCell>
            {!mdDown && (
              <>
                <TableCell align="right">{el.students}</TableCell>
                <TableCell align="right">{el.frequencies}</TableCell>
              </>
            )}
            <TableCell
              align="right"
              sx={{
                color: "#fff",
                bgcolor: defineBgColorInfrequency(el.infrequency, theme),
              }}
            >
              {String(el.infrequency).replace(".", ",")}%
            </TableCell>
          </TableRow>
        ))}
      </TableBase>
      {mdDown && <PaginationMobile />}
    </Box>
  );
};
