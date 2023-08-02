import { Backdrop, CircularProgress } from '@mui/material'
import { useAppThemeContext } from '../../contexts'

interface iCompLoadingProps {
  loading: boolean
}

export const CompLoading = ({ loading }: iCompLoadingProps) => {
  const { theme } = useAppThemeContext()
  return (
    <Backdrop
      sx={{
        color: theme.palette.secondary.main,
        zIndex: theme.zIndex.drawer + 1,
      }}
      open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}
