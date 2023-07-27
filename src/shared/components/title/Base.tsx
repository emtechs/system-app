import { Breadcrumbs, Chip, Link } from '@mui/material'
import { Home } from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom'
import { iChildren } from '../../interfaces'

export const TitleBasePage = ({ children }: iChildren) => {
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
      {children}
    </Breadcrumbs>
  )
}
