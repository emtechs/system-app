import { Breadcrumbs, Chip, Link } from '@mui/material'
import { Home, People } from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom'
import { useAppThemeContext } from '../../../contexts'
import { LabelUser } from '../../../components'

export const TitleUserRetrievePage = () => {
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
      <Link underline="none" color="inherit" component={RouterLink} to="/user">
        <Chip
          clickable
          color="primary"
          variant="outlined"
          label={mdDown ? '...' : 'Usuários'}
          icon={<People sx={{ mr: 0.5 }} fontSize="inherit" />}
        />
      </Link>
      <LabelUser />
    </Breadcrumbs>
  )
}
