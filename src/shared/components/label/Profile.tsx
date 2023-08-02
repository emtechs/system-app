import { Chip, Skeleton } from '@mui/material'
import { AccountBox } from '@mui/icons-material'
import { useAppThemeContext, useAuthContext, adaptName } from '../../../shared'

export const LabelProfile = () => {
  const { mdDown, loading } = useAppThemeContext()
  const { userProfile } = useAuthContext()

  const label = loading ? (
    <Skeleton width={100} />
  ) : mdDown ? (
    adaptName(userProfile?.name)
  ) : (
    userProfile?.name
  )

  return (
    <Chip
      color="primary"
      label={label}
      icon={<AccountBox sx={{ mr: 0.5 }} fontSize="inherit" />}
    />
  )
}
