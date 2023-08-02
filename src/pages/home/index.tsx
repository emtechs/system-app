import { Navigate } from 'react-router-dom'
import { Box, Container, Grid } from '@mui/material'
import { HomePageAdmin } from './Admin'
import { School, User } from './components'
import { useAppThemeContext, useAuthContext, Header } from '../../shared'

interface iHomePageProps {
  isHome?: boolean
}

export const HomePage = ({ isHome }: iHomePageProps) => {
  const { theme, mdDown } = useAppThemeContext()
  const { isAuthenticated, userProfile } = useAuthContext()

  if (!isAuthenticated) return <Navigate to="/login" />

  if (userProfile?.role === 'ADMIN' && !isHome) return <HomePageAdmin />

  return (
    <Box display="flex" flexDirection="column">
      <Header isHome={isHome} />
      <Box mt={theme.spacing(7)}>
        <Container>
          <Grid
            container
            direction={mdDown ? 'column' : 'row'}
            spacing={mdDown ? 2 : 5}
          >
            <School />
            <User />
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}
