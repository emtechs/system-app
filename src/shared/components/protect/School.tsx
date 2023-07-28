import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '../../contexts'

export const ProtectedSchool = () => {
  const { dashData } = useAuthContext()

  if (dashData) {
    if (dashData === 'ADMIN' || dashData === 'SCHOOL') return <Outlet />
    return <Navigate replace to="/" />
  }
  return <Navigate replace to="/" />
}
