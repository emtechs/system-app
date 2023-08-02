import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  useAppThemeContext,
  useAuthContext,
  useCalendarContext,
  useDrawerContext,
  useUserContext,
} from '../../contexts'
import { apiAuth } from '../../services'

export const useVerifyUser = () => {
  const navigate = useNavigate()
  const { setLoading } = useAppThemeContext()
  const { yearData } = useAuthContext()
  const { setUserSelect } = useUserContext()
  const { handleDisplayDash } = useDrawerContext()
  const { handleListYear } = useCalendarContext()

  const verifyUser = useCallback((id: string) => {
    setLoading(true)
    apiAuth
      .verify(`?user_id=${id}`)
      .then((res) => {
        setUserSelect(res.select)
        if (res.years) {
          if (res.years.length > 0) {
            handleListYear(res.years)
          } else if (yearData) {
            handleListYear([yearData])
          }
        }
      })
      .catch(() => {
        handleDisplayDash('ADMIN')
        navigate('/')
      })
      .finally(() => setLoading(false))
  }, [])

  return { verifyUser }
}
