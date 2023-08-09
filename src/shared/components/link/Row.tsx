import { TableRow } from '@mui/material'
import { Link } from 'react-router-dom'
import { iChildren } from '../../interfaces'

interface iTableRowLinkProps extends iChildren {
  href: string
  onClick?: () => void
}

export const TableRowLink = ({
  children,
  href,
  onClick,
}: iTableRowLinkProps) => (
  <TableRow hover component={Link} to={href} onClick={onClick}>
    {children}
  </TableRow>
)
