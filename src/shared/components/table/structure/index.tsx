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
import { usePaginationContext } from "../../../contexts";
import { iTable } from "../../../interfaces";
import { PaginationTable } from "../../pagination";
import { TableSort } from "./Sort";

export const TableBase = ({
  message,
  children,
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
          <TableSort headCells={headCells} />
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
                <TableCell colSpan={headCells.length}>
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
