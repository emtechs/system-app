import { Breadcrumbs, Chip, Link } from '@mui/material'
import { Checklist, Home } from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom'
import { useAppThemeContext } from '../../../../contexts'
import { LabelUser } from '../../../../components'

export const TitleUserViewFrequencyPage = () => {
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
      <LabelUser clickable />
      <Chip
        color="primary"
        label="Frequências"
        icon={<Checklist sx={{ mr: 0.5 }} fontSize="inherit" />}
      />
    </Breadcrumbs>
  )
}
