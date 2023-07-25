import { Breadcrumbs, Chip, Link } from '@mui/material'
import { Home, School } from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom'

export const TitleSchoolPage = () => {
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
      <Chip
        label="Escolas"
        color="primary"
        icon={<School sx={{ mr: 0.5 }} fontSize="inherit" />}
      />
    </Breadcrumbs>
  )
}
