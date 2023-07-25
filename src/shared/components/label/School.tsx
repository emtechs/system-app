import { Chip, Link, Skeleton } from '@mui/material'
import { useAppThemeContext, useSchoolContext } from '../../contexts'
import { iLabelBaseProps } from '../../interfaces'
import { School } from '@mui/icons-material'
import { adaptNameSchool } from '../../scripts'
import { useMemo } from 'react'
import { Link as RouterLink } from 'react-router-dom'

export const LabelSchool = ({ clickable }: iLabelBaseProps) => {
  const { mdDown, loading } = useAppThemeContext()
  const { schoolSelect } = useSchoolContext()

  const label = useMemo(() => {
    if (loading) return <Skeleton width={100} />
    if (mdDown) return adaptNameSchool(schoolSelect?.label, 15)
    return schoolSelect?.label
  }, [loading, mdDown, schoolSelect])

  return clickable ? (
    <Link
      underline="none"
      color="inherit"
      component={RouterLink}
      to={'/school/' + schoolSelect?.id}
    >
      <Chip
        clickable
        color="primary"
        variant={'outlined'}
        label={label}
        icon={<School sx={{ mr: 0.5 }} fontSize="inherit" />}
      />
    </Link>
  ) : (
    <Chip
      color="primary"
      label={label}
      icon={<School sx={{ mr: 0.5 }} fontSize="inherit" />}
    />
  )
}
