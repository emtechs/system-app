import { TableCell, Skeleton } from '@mui/material'
import { iChildren } from '../../interfaces'

interface iTableCellDataLoadingProps extends iChildren {
  loading: boolean
  width?: number
  isNumeric?: boolean
}

export const TableCellDataLoading = ({
  children,
  loading,
  isNumeric,
  width = 100,
}: iTableCellDataLoadingProps) => {
  return (
    <TableCell align={isNumeric ? 'right' : undefined}>
      {loading ? <Skeleton width={width} /> : children}
    </TableCell>
  )
}
