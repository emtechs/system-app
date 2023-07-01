import { useEffect } from "react";
import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { usePaginationContext } from "../../../contexts";
import { iheadCell } from "../../../interfaces";

interface iSortProps {
  headCells: iheadCell[];
}

export const TableSort = ({ headCells }: iSortProps) => {
  const { by, setBy, order, setOrder } = usePaginationContext();

  const createSortHandler = (property?: string) => () => {
    const isAsc = order === property && by === "asc";
    setOrder(property);
    setBy(isAsc ? "desc" : "asc");
  };

  useEffect(() => {
    return setOrder("name");
  }, []);

  return (
    <TableHead>
      <TableRow>
        {headCells.map((el, index) => (
          <TableCell
            key={index}
            align={el.numeric ? "right" : "left"}
            sortDirection={order === el.order ? by : false}
          >
            <TableSortLabel
              disabled={!el.order}
              active={order === el.order}
              direction={order === el.order ? by : undefined}
              onClick={createSortHandler(el.order)}
            >
              {el.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
