import { Skeleton } from '@mui/material'
import { TableCellLink, iChildren } from '../../../shared'

interface iTableCellLinkLoadingProps extends iChildren {
  isLoading: boolean
  width?: number
}

export const TableCellLinkLoading = ({
  children,
  isLoading,
  width = 150,
}: iTableCellLinkLoadingProps) => {
  return isLoading ? (
    <TableCellLink link="div">
      <Skeleton width={width} />
    </TableCellLink>
  ) : (
    children
  )
}
