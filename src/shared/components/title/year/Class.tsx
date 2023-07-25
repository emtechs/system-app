import { Breadcrumbs, Chip, Link } from '@mui/material'
import { Home, Workspaces } from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom'
import { LabelClass, LabelSchool, LabelYear } from '../../../components'
import { useAppThemeContext, useAuthContext } from '../../../contexts'

export const TitleClassYearPage = () => {
  const { mdDown } = useAppThemeContext()
  const { yearData } = useAuthContext()

  return (
    <Breadcrumbs maxItems={mdDown ? 2 : undefined} aria-label="breadcrumb">
      <Link underline="none" color="inherit" component={RouterLink} to="/">
        <Chip
          clickable
          color="primary"
          variant="outlined"
          label={mdDown ? '...' : 'Página Inicial'}
          icon={<Home sx={{ mr: 0.5 }} fontSize="inherit" />}
        />
      </Link>
      <Link
        underline="none"
        color="inherit"
        component={RouterLink}
        to={`/year/${yearData?.id}/class`}
      >
        <Chip
          clickable
          color="primary"
          variant="outlined"
          label={mdDown ? '...' : 'Turmas'}
          icon={<Workspaces sx={{ mr: 0.5 }} fontSize="inherit" />}
        />
      </Link>
      <LabelYear />
      <LabelSchool />
      <LabelClass />
    </Breadcrumbs>
  )
}
