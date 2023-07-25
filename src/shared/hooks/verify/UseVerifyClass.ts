import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  useAppThemeContext,
  useAuthContext,
  useClassContext,
} from '../../contexts'
import { apiAuth } from '../../services'

export const useVerifyClass = () => {
  const navigate = useNavigate()
  const { setLoading } = useAppThemeContext()
  const { setListYear, yearData } = useAuthContext()
  const { setClassSelect } = useClassContext()

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
      .catch(() => navigate('/'))
      .finally(() => setLoading(false))
  }, [])

  return { verifyClass }
}
