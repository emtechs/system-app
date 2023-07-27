import { Chip, Skeleton } from '@mui/material'
import { School } from '@mui/icons-material'
import { useMemo } from 'react'
import { useAppThemeContext, useSchoolContext } from '../../contexts'
import { iLabelBaseProps } from '../../interfaces'
import { adaptNameSchool } from '../../scripts'
import { LinkChip } from '../link'

export const LabelSchool = ({ clickable, isSchool }: iLabelBaseProps) => {
  const { mdDown, loading } = useAppThemeContext()
  const { schoolSelect } = useSchoolContext()
  const to = isSchool ? `/${schoolSelect?.id}` : `/school/${schoolSelect?.id}`

  const label = useMemo(() => {
    if (loading) return <Skeleton width={100} />
    if (mdDown) return adaptNameSchool(schoolSelect?.label, 15)
    return schoolSelect?.label
  }, [loading, mdDown, schoolSelect])

  return clickable ? (
    <LinkChip
      label={label}
      icon={<School sx={{ mr: 0.5 }} fontSize="inherit" />}
      to={to}
    />
  ) : (
    <Chip
      color="primary"
      label={label}
      icon={<School sx={{ mr: 0.5 }} fontSize="inherit" />}
    />
  )
}
