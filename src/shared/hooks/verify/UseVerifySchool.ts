import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  useAppThemeContext,
  useAuthContext,
  useCalendarContext,
  useDrawerContext,
  useSchoolContext,
} from '../../contexts'
import { apiAuth, apiSchool } from '../../services'

export const useVerifySchool = () => {
  const navigate = useNavigate()
  const { setLoading } = useAppThemeContext()
  const { yearData } = useAuthContext()
  const { setSchoolSelect, setSchoolResume, setLoadingSchoolResume } =
    useSchoolContext()
  const { handleDisplayDash } = useDrawerContext()
  const { handleListYear } = useCalendarContext()

  const verifySchool = useCallback((id: string) => {
    setLoading(true)
    apiAuth
      .verify(`?school_id=${id}`)
      .then((res) => {
        setSchoolSelect(res.select)
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

    if (yearData) {
      setLoadingSchoolResume(true)
      apiSchool
        .resume(id, yearData.id, '')
        .then((res) => setSchoolResume(res.result))
        .finally(() => setLoadingSchoolResume(false))
    }
  }, [])

  return { verifySchool }
}
