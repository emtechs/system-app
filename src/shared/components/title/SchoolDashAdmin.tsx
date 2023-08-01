import { Breadcrumbs, Chip, Link } from '@mui/material'
import { Home } from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom'
import { useAppThemeContext } from '../../contexts'
import { LabelSchool } from '../../components'

export const TitleSchoolDashAdmin = () => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link underline="none" color="inherit" component={RouterLink} to="/">
        <Chip
          clickable
          color="primary"
          variant="outlined"
          label="Página Inicial"
          icon={<Home sx={{ mr: 0.5 }} fontSize="inherit" />}
        />
      </Link>
      <LabelSchool />
    </Breadcrumbs>
  )
}

interface iTitleSchoolDashAdminPagesProps {
  breadcrumbs: JSX.Element[]
}

export const TitleSchoolDashAdminPages = ({
  breadcrumbs,
}: iTitleSchoolDashAdminPagesProps) => {
  const { mdDown } = useAppThemeContext()

  return (
    <Breadcrumbs maxItems={mdDown ? 2 : undefined} aria-label="breadcrumb">
      <Link underline="none" color="inherit" component={RouterLink} to="/">
        <Chip
          clickable
          color="primary"
          variant="outlined"
          label="Página Inicial"
          icon={<Home sx={{ mr: 0.5 }} fontSize="inherit" />}
        />
      </Link>
      <Link
        underline="none"
        color="inherit"
        component={RouterLink}
        to="/school"
      >
        <LabelSchool clickable />
      </Link>
      {breadcrumbs}
    </Breadcrumbs>
  )
}
