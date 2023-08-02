import { Skeleton } from '@mui/material'
import { iChildren } from '../../../shared'

interface iChildrenLoadingProps extends iChildren {
  isLoading: boolean
  width?: number
}

export const ChildrenLoading = ({
  children,
  isLoading,
  width = 150,
}: iChildrenLoadingProps) => {
  return isLoading ? <Skeleton width={width} /> : children
}
