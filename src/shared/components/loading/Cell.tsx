import { TableCell, Skeleton } from '@mui/material'
import { iChildren } from '../../interfaces'

interface iTableCellLoadingProps extends iChildren {
  isLoading: boolean
  width?: number
}

export const TableCellLoading = ({
  children,
  isLoading,
  width = 150,
}: iTableCellLoadingProps) => {
  return isLoading ? (
    <TableCell>
      <Skeleton width={width} />
    </TableCell>
  ) : (
    children
  )
}
