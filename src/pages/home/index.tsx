import { Box, Container, Grid } from '@mui/material'
import { useAppThemeContext, useAuthContext } from '../../shared/contexts'
import { HomePageAdmin } from './Admin'
import { Header } from '../../shared/components'
import { School, User } from './components'
import { Navigate } from 'react-router-dom'

interface iHomePageProps {
  isHome?: boolean
}

export const HomePage = ({ isHome }: iHomePageProps) => {
  const { theme, mdDown } = useAppThemeContext()
  const { isAuthenticated, userData, periodsUser } = useAuthContext()

  if (!isAuthenticated) return <Navigate to="/login" />

  if (userData?.role === 'ADMIN' && !isHome) return <HomePageAdmin />

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
            <User user={userData} periods={periodsUser} />
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}
