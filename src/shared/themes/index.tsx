import { createTheme } from '@mui/material'
import { ptBR } from '@mui/material/locale'

export const Theme = createTheme(
  {
    palette: {
      primary: {
        main: '#626169',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: '#4460a8',
        contrastText: '#FFFFFF',
      },
      background: { default: '#cad8e3', paper: '#FFFFFF' },
    },
  },
  ptBR,
)
