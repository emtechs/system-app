import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  useAppThemeContext,
  useSchoolContext,
  useClassContext,
  useCalendarContext,
  useDrawerContext,
} from '../../contexts'
import { apiAuth } from '../../services'

export const useVerifyClassKey = () => {
  const navigate = useNavigate()
  const { setLoading } = useAppThemeContext()
  const { setSchoolSelect } = useSchoolContext()
  const { setClassSelect } = useClassContext()
  const { setYearSelect } = useCalendarContext()
  const { handleDisplayDash } = useDrawerContext()

  const verifyClassKey = useCallback((id: string) => {
    setLoading(true)
    setLoading(true)
    apiAuth
      .verify(`?key_class=${id}`)
      .then((res) => {
        setClassSelect(res.select)
        setSchoolSelect(res.school)
        setYearSelect(res.year)
      })
      .catch(() => {
        handleDisplayDash('ADMIN')
        navigate('/')
      })
      .finally(() => setLoading(false))
  }, [])

  return { verifyClassKey }
}
