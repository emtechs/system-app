import { Link, TableRow } from "@mui/material";
import { iChildren } from "../../interfaces";

interface iTableRowLinkProps extends iChildren {
  href: string;
  onClick?: () => void;
}

export const TableRowLink = ({
  children,
  href,
  onClick,
}: iTableRowLinkProps) => (
  <TableRow
    hover
    underline="none"
    component={Link}
    href={href}
    onClick={onClick}
  >
    {children}
  </TableRow>
);
