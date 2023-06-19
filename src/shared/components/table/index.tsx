import {
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import { iTable } from "../../interfaces";
import { usePaginationContext } from "../../contexts";
import { Pagination } from "./Pagination";
import { TableSort } from "./Sort";

export const TableBase = ({
  children,
  is_active,
  headCells,
  is_pagination = true,
}: iTable) => {
  const { isLoading, count } = usePaginationContext();
  return (
    <>
      <TableContainer
        sx={{ mx: 2, mt: 1, width: "auto" }}
        component={Paper}
        variant="outlined"
      >
        <Table>
          <TableHead>
            <TableRow>
              {is_active && <TableCell></TableCell>}
              <TableSort headCells={headCells} />
            </TableRow>
          </TableHead>
          <TableBody>{children}</TableBody>
          {count === 0 && !isLoading && (
            <caption>Nenhum registro encontrado.</caption>
          )}
          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell
                  colSpan={is_active ? headCells.length + 1 : headCells.length}
                >
                  <LinearProgress variant="indeterminate" />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
      {is_pagination && <Pagination />}
    </>
  );
};
