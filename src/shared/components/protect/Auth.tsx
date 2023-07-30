import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '../../contexts'
import { CompLoading, First } from '../../components'

export const ProtectedAuth = () => {
  const { profileUser, isAuthenticated } = useAuthContext()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    profileUser()
    setLoading(false)
  }, [profileUser])

  return loading ? (
    <CompLoading loading={loading} />
  ) : isAuthenticated ? (
    <First>
      <Outlet />
    </First>
  ) : (
    <Navigate to="/login" />
  )
}
