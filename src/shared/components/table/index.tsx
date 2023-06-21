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
import { TableSort } from "./Sort";
import { PaginationTable } from "../pagination";

export const TableBase = ({
  message,
  children,
  is_active,
  headCells,
  is_body = true,
  is_pagination = true,
  is_message = true,
}: iTable) => {
  const { isLoading, count, total } = usePaginationContext();
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
          {is_body ? (
            <TableBody>{children}</TableBody>
          ) : isLoading ? (
            <></>
          ) : (
            <TableBody>{children}</TableBody>
          )}
          {is_message ? (
            is_pagination ? (
              count === 0 &&
              !isLoading && (
                <caption>
                  {message ? message : "Nenhum registro encontrado."}
                </caption>
              )
            ) : (
              total === 0 &&
              !isLoading && (
                <caption>
                  {message ? message : "Nenhum registro encontrado."}
                </caption>
              )
            )
          ) : (
            <></>
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
      {is_pagination && <PaginationTable />}
    </>
  );
};
