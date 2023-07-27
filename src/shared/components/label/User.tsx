import { Chip, Skeleton } from '@mui/material'
import { Person } from '@mui/icons-material'
import { useAppThemeContext, useUserContext } from '../../contexts'
import { iLabelBaseProps } from '../../interfaces'
import { adaptName } from '../../scripts'
import { LinkChip } from '../link'

export const LabelUser = ({ clickable, to }: iLabelBaseProps) => {
  const { mdDown, loading } = useAppThemeContext()
  const { userSelect } = useUserContext()

  const label = loading ? (
    <Skeleton width={100} />
  ) : mdDown ? (
    adaptName(userSelect?.label)
  ) : (
    userSelect?.label
  )

  return clickable ? (
    <LinkChip
      label={label}
      icon={<Person sx={{ mr: 0.5 }} fontSize="inherit" />}
      to={to}
    />
  ) : (
    <Chip
      color="primary"
      label={label}
      icon={<Person sx={{ mr: 0.5 }} fontSize="inherit" />}
    />
  )
}
