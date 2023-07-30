import { TableCell, Skeleton } from '@mui/material'
import { iChildren } from '../../interfaces'

interface iCellLoadingProps extends iChildren {
  loading: boolean
  width?: number
  isNumeric?: boolean
}

export const CellLoading = ({
  children,
  loading,
  isNumeric,
  width = 100,
}: iCellLoadingProps) => {
  return (
    <TableCell align={isNumeric ? 'right' : undefined}>
      {loading ? <Skeleton width={width} /> : children}
    </TableCell>
  )
}
