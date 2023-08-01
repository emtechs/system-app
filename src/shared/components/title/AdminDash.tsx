import { Breadcrumbs, Chip, Link } from '@mui/material'
import { useAppThemeContext } from '../../contexts'
import { Home } from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom'

export const TitleAdminDash = () => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link underline="none" color="inherit" component={RouterLink} to="/">
        <Chip
          color="primary"
          variant="filled"
          label="Página Inicial"
          icon={<Home sx={{ mr: 0.5 }} fontSize="inherit" />}
        />
      </Link>
    </Breadcrumbs>
  )
}

interface iTitleAdminDashPagesProps {
  breadcrumbs: JSX.Element[]
}

export const TitleAdminDashPages = ({
  breadcrumbs,
}: iTitleAdminDashPagesProps) => {
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
      {breadcrumbs}
    </Breadcrumbs>
  )
}
