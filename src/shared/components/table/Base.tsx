import { Paper, Table, TableContainer } from "@mui/material";
import { Pagination } from "./pagination";
import { iTable } from "../../interfaces";

export const TableBase = ({ children, isPagination }: iTable) => {
  return (
    <>
      <TableContainer
        sx={{ mx: 2, mt: 1, width: "auto", maxHeight: "80%" }}
        component={Paper}
        variant="outlined"
      >
        <Table stickyHeader>{children}</Table>
      </TableContainer>
      {isPagination && <Pagination />}
    </>
  );
};
