import { TableCell, TableCellProps } from '@mui/material'

interface iTableCellLinkProps extends TableCellProps {
  numeric?: 'right' | 'left'
  link?: 'div'
}

export const TableCellLink = (props: iTableCellLinkProps) => {
  const { link, numeric } = props

  return <TableCell component={link} align={numeric} {...props} />
}
