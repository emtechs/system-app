import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '../../contexts'

export const ProtectedAdmin = () => {
  const { dashData } = useAuthContext()
  return dashData === 'ADMIN' ? <Outlet /> : <Navigate replace to="/" />
}
