import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  useAppThemeContext,
  useAuthContext,
  useDrawerContext,
  useSchoolContext,
} from '../../contexts'
import { apiAuth } from '../../services'

export const useVerifySchool = () => {
  const navigate = useNavigate()
  const { setLoading } = useAppThemeContext()
  const { setListYear, yearData } = useAuthContext()
  const { setSchoolSelect } = useSchoolContext()
  const { handleDisplayDash } = useDrawerContext()

  const verifySchool = useCallback((id: string) => {
    setLoading(true)
    apiAuth
      .verify(`?school_id=${id}`)
      .then((res) => {
        setSchoolSelect(res.select)
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

  return { verifySchool }
}
