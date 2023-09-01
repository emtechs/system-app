import { Breadcrumbs, Chip, Link } from '@mui/material'
import { Home, Workspaces } from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom'
import { useAppThemeContext } from '../../../contexts'
import { LabelClass } from '../../../components'

export const TitleClassRetrievePage = () => {
  const { mdDown } = useAppThemeContext()

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
      <Link underline="none" color="inherit" component={RouterLink} to="/class">
        <Chip
          clickable
          color="primary"
          variant="outlined"
          label={mdDown ? '...' : 'Turmas'}
          icon={<Workspaces sx={{ mr: 0.5 }} fontSize="inherit" />}
        />
      </Link>
      <LabelClass />
    </Breadcrumbs>
  )
}
