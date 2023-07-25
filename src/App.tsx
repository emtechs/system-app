import { CssBaseline } from '@mui/material'
import AppRoutes from './routes'
import Providers from './shared/contexts'

const App = () => {
  return (
    <Providers>
      <CssBaseline />
      <AppRoutes />
    </Providers>
  )
}

export default App
