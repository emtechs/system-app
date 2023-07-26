import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  useAppThemeContext,
  useAuthContext,
  useClassContext,
  useDrawerContext,
} from '../../contexts'
import { apiAuth } from '../../services'

export const useVerifyClass = () => {
  const navigate = useNavigate()
  const { setLoading } = useAppThemeContext()
  const { setListYear, yearData } = useAuthContext()
  const { setClassSelect } = useClassContext()
  const { handleDisplayDash } = useDrawerContext()

  const verifyClass = useCallback((id: string) => {
    setLoading(true)
    apiAuth
      .verify(`?class_id=${id}`)
      .then((res) => {
        setClassSelect(res.select)
        if (res.years) {
          if (res.years.length > 0) {
            setListYear(res.years)
          } else if (yearData) {
            setListYear([yearData])
          }
        }
      })
      .catch(() => {
        handleDisplayDash('ADMIN')
        navigate('/')
      })
      .finally(() => setLoading(false))
  }, [])

  return { verifyClass }
}
