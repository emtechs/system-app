import { TableCell, Skeleton } from '@mui/material'
import { iChildren } from '../../interfaces'

interface iTableCellLoadingProps extends iChildren {
  loading: boolean
  width?: number
  isNumeric?: boolean
}

export const TableCellLoading = ({
  children,
  loading,
  isNumeric,
  width = 100,
}: iTableCellLoadingProps) => {
  return (
    <TableCell align={isNumeric ? 'right' : undefined}>
      {loading ? <Skeleton width={width} /> : children}
    </TableCell>
  )
}
