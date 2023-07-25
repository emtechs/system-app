import { Breadcrumbs, Chip, Link } from '@mui/material'
import { Home, People } from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom'
import { useAppThemeContext } from '../../../../contexts'
import { LabelSchool } from '../../../../components'

export const TitleSchoolViewServerPage = () => {
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
      <LabelSchool clickable />
      <Chip
        color="primary"
        label="Servidores"
        icon={<People sx={{ mr: 0.5 }} fontSize="inherit" />}
      />
    </Breadcrumbs>
  )
}
