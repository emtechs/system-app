import { useMemo } from "react";
import { TableBase } from "../../../../shared/components";
import { iClass, iHeadcell } from "../../../../shared/interfaces";
import {
  IconButton,
  Link,
  Skeleton,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { usePaginationContext } from "../../../../shared/contexts";
import { Visibility } from "@mui/icons-material";

interface iTableClassProps {
  data: iClass[];
}

export const TableClass = ({ data }: iTableClassProps) => {
  const { isLoading, onClickReset } = usePaginationContext();

  const headCells: iHeadcell[] = useMemo(() => {
    return [
      { order: "name", numeric: "left", label: "Turma" },
      { order: "schools", numeric: "right", label: "Escolas" },
      { order: "students", numeric: "right", label: "Alunos" },
      { order: "frequencies", numeric: "right", label: "Frequências" },
      { numeric: "left", label: "Ações" },
    ];
  }, []);

  return (
    <TableBase headCells={headCells}>
      {data.map((el) => (
        <TableRow hover key={el.id}>
          <TableCell>
            {isLoading ? (
              <Skeleton width={300} />
            ) : el.is_active ? (
              <Typography
                underline="none"
                variant="body2"
                color="inherit"
                component={Link}
                href={`/class/${el.id}`}
                onClick={onClickReset}
              >
                {el.name}
              </Typography>
            ) : (
              el.name
            )}
          </TableCell>
          <TableCell align="right">
            {isLoading ? <Skeleton width={150} /> : el.schools}
          </TableCell>
          <TableCell align="right">
            {isLoading ? <Skeleton width={150} /> : el.students}
          </TableCell>
          <TableCell align="right">
            {isLoading ? <Skeleton width={150} /> : el.frequencies}
          </TableCell>
          <TableCell>
            <Tooltip title="Detalhar">
              <IconButton
                color="primary"
                size="small"
                href={`/class/${el.id}`}
                onClick={onClickReset}
              >
                <Visibility fontSize="small" />
              </IconButton>
            </Tooltip>
          </TableCell>
        </TableRow>
      ))}
    </TableBase>
  );
};
