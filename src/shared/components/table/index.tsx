import {
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableRow,
} from "@mui/material";
import { usePaginationContext } from "../../contexts";
import { iTable } from "../../interfaces";
import { PaginationTable } from "../pagination";
import { TableSort } from "./Sort";

export const TableBase = ({ message, children, headCells }: iTable) => {
  const { isLoading, count } = usePaginationContext();
  return (
    <>
      <TableContainer
        sx={{ mx: 2, mt: 1, width: "auto" }}
        component={Paper}
        variant="outlined"
      >
        <Table>
          <TableSort headCells={headCells} />
          {isLoading ? <></> : <TableBody>{children}</TableBody>}
          {count === 0 && !isLoading && (
            <caption>
              {message ? message : "Nenhum registro encontrado."}
            </caption>
          )}
          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={headCells.length}>
                  <LinearProgress variant="indeterminate" />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
      <PaginationTable />
    </>
  );
};
