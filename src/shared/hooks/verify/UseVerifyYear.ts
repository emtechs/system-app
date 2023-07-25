import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppThemeContext, useCalendarContext } from '../../contexts'
import { apiAuth } from '../../services'

export const useVerifyYear = () => {
  const navigate = useNavigate()
  const { setLoading } = useAppThemeContext()
  const { setYearSelect } = useCalendarContext()

  const verifyYear = useCallback((id?: string, year?: string) => {
    let query = ''
    if (id) query = `?year_id=${id}`
    if (year) query = `?year=${year}`
    setLoading(true)
    apiAuth
      .verify(query)
      .then((res) => setYearSelect(res.select))
      .catch(() => navigate('/'))
      .finally(() => setLoading(false))
  }, [])

  return { verifyYear }
}
