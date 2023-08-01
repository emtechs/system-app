import { Breadcrumbs, Chip, Link } from '@mui/material'
import { useAppThemeContext } from '../../contexts'
import { Home, School } from '@mui/icons-material'
import { LabelSchool } from '../label'
import { Link as RouterLink } from 'react-router-dom'

interface iTitleSchoolAdminPagesProps {
  breadcrumbs: JSX.Element[]
}

export const TitleSchoolAdminPages = ({
  breadcrumbs,
}: iTitleSchoolAdminPagesProps) => {
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
        <Chip
          clickable
          color="primary"
          variant="outlined"
          label="Escolas"
          icon={<School sx={{ mr: 0.5 }} fontSize="inherit" />}
        />
      </Link>
      {breadcrumbs}
    </Breadcrumbs>
  )
}

export const TitleRetrieveSchoolAdminPages = ({
  breadcrumbs,
}: iTitleSchoolAdminPagesProps) => {
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
        <Chip
          clickable
          color="primary"
          variant="outlined"
          label="Escolas"
          icon={<School sx={{ mr: 0.5 }} fontSize="inherit" />}
        />
      </Link>
      <LabelSchool clickable />
      {breadcrumbs}
    </Breadcrumbs>
  )
}
