import { useEffect, useState } from 'react'
import { Backdrop, CircularProgress } from '@mui/material'
import { Navigate, Outlet } from 'react-router-dom'
import { useAppThemeContext, useAuthContext } from '../../contexts'
import { First } from '../first'

export const ProtectedAuth = () => {
  const { theme } = useAppThemeContext()
  const { profileUser, isAuthenticated } = useAuthContext()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    profileUser()
    setLoading(false)
  }, [profileUser])

  return loading ? (
    <Backdrop
      sx={{
        color: theme.palette.secondary.main,
        zIndex: theme.zIndex.drawer + 1,
      }}
      open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : isAuthenticated ? (
    <First>
      <Outlet />
    </First>
  ) : (
    <Navigate to="/login" />
  )
}
