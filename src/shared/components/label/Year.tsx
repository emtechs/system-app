import { Chip, Skeleton } from '@mui/material'
import { useAppThemeContext, useCalendarContext } from '../../contexts'
import { iLabelBaseProps } from '../../interfaces'
import { Today } from '@mui/icons-material'
import { LinkChip } from '../link'

export const LabelYear = ({ clickable, to }: iLabelBaseProps) => {
  const { loading } = useAppThemeContext()
  const { yearSelect } = useCalendarContext()

  const label = loading ? <Skeleton width={100} /> : yearSelect?.label

  return clickable ? (
    <LinkChip
      label={label}
      icon={<Today sx={{ mr: 0.5 }} fontSize="inherit" />}
      to={to}
    />
  ) : (
    <Chip
      color="primary"
      label={label}
      icon={<Today sx={{ mr: 0.5 }} fontSize="inherit" />}
    />
  )
}
