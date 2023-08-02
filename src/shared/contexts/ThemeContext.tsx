import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import {
  Alert,
  Backdrop,
  CircularProgress,
  Theme as iTheme,
  Snackbar,
  ThemeProvider,
  useMediaQuery,
} from '@mui/material'
import { iChildren } from '../interfaces'
import { Theme } from '../themes'

interface iThemeContextProps {
  theme: iTheme
  smDown: boolean
  mdDown: boolean
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
  handleSucess: (msg: string) => void
  handleError: (msg: string) => void
}

const ThemeContext = createContext({} as iThemeContextProps)

export const AppThemeProvider = ({ children }: iChildren) => {
  const theme = useMemo(() => Theme, [])
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [severity, setSeverity] = useState<'success' | 'error'>('success')
  const [message, setMessage] = useState<string>()

  const handleSucess = useCallback((msg: string) => {
    setMessage(msg)
    setSeverity('success')
    setOpen(true)
  }, [])

  const handleError = useCallback((msg: string) => {
    setMessage(msg)
    setSeverity('error')
    setOpen(true)
  }, [])

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (event) {
      /* empty */
    }
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  return (
    <ThemeContext.Provider
      value={{
        handleError,
        handleSucess,
        mdDown,
        setLoading,
        smDown,
        theme,
        loading,
      }}
    >
      <ThemeProvider theme={theme}>
        {children}
        <Backdrop
          sx={{
            color: theme.palette.secondary.main,
            zIndex: theme.zIndex.drawer + 1,
          }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Snackbar
          anchorOrigin={
            mdDown
              ? { vertical: 'bottom', horizontal: 'center' }
              : { vertical: 'top', horizontal: 'right' }
          }
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={severity}
            sx={{ width: '100%' }}
          >
            {message}
          </Alert>
        </Snackbar>
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

export const useAppThemeContext = () => useContext(ThemeContext)
