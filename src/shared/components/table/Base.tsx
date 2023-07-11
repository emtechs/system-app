import { useMemo } from "react";
import {
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableFooter,
  TableRow,
} from "@mui/material";
import { usePaginationContext } from "../../contexts";
import { iLinkComp, iTable } from "../../interfaces";
import { TableSort } from "./Sort";
import { TableCellLink } from "./CellLink";

export const TableBase = ({ message, children, headCells, link }: iTable) => {
  const { isLoading, count } = usePaginationContext();

  const linkComp: iLinkComp = useMemo(() => {
    if (link) return { component: link };
    return {};
  }, [link]);

  return (
    <TableContainer
      sx={{ mx: 2, mt: 1, width: "auto" }}
      component={Paper}
      variant="outlined"
    >
      <Table {...linkComp}>
        <TableSort headCells={headCells} linkComp={linkComp} link={link} />
        <TableBody {...linkComp}>{children}</TableBody>
        {count === 0 && !isLoading && (
          <caption>{message ? message : "Nenhum registro encontrado."}</caption>
        )}
        <TableFooter {...linkComp}>
          {isLoading && (
            <TableRow {...linkComp}>
              <TableCellLink colSpan={headCells.length} link={link}>
                <LinearProgress variant="indeterminate" />
              </TableCellLink>
            </TableRow>
          )}
        </TableFooter>
      </Table>
    </TableContainer>
  );
};
