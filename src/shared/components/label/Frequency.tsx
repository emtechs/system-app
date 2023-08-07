import { Chip, Skeleton } from '@mui/material'
import { Workspaces } from '@mui/icons-material'
import { useAppThemeContext, useFrequencyContext } from '../../contexts'
import { iLabelBaseProps } from '../../interfaces'
import { adaptNameSchool } from '../../scripts'
import { LinkChip } from '../link'

export const LabelFrequency = ({ clickable, to }: iLabelBaseProps) => {
  const { mdDown, loading } = useAppThemeContext()
  const { frequencySelect } = useFrequencyContext()

  const label = loading ? (
    <Skeleton width={100} />
  ) : mdDown ? (
    adaptNameSchool(frequencySelect?.label, 15)
  ) : (
    frequencySelect?.label
  )

  return clickable ? (
    <LinkChip
      label={label}
      icon={<Workspaces sx={{ mr: 0.5 }} fontSize="inherit" />}
      to={to}
    />
  ) : (
    <Chip
      color="primary"
      label={label}
      icon={<Workspaces sx={{ mr: 0.5 }} fontSize="inherit" />}
    />
  )
}
