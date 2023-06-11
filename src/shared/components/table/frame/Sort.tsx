import { TableCell, TableSortLabel } from "@mui/material";
import { iheadCell } from "../../../interfaces";
import { useTableContext } from "../../../contexts";

interface iSortProps {
  headCells: iheadCell[];
}

export const TableSort = ({ headCells }: iSortProps) => {
  const { by, setBy, order, setOrder } = useTableContext();

  const createSortHandler = (property?: string) => () => {
    const isAsc = order === property && by === "asc";
    setOrder(property);
    setBy(isAsc ? "desc" : "asc");
  };

  return (
    <>
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
    </>
  );
};
