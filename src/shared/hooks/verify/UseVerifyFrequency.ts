import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  useAppThemeContext,
  useSchoolContext,
  useDrawerContext,
  useFrequencyContext,
} from '../../contexts'
import { apiAuth } from '../../services'

export const useVerifyFrequency = () => {
  const navigate = useNavigate()
  const { setLoading } = useAppThemeContext()
  const { setSchoolSelect } = useSchoolContext()
  const { setFrequencySelect } = useFrequencyContext()
  const { handleDisplayDash } = useDrawerContext()

  const verifyFrequency = useCallback((id: string) => {
    setLoading(true)
    apiAuth
      .verify(`?frequency_id=${id}`)
      .then((res) => {
        setFrequencySelect(res.select)
        setSchoolSelect(res.school)
      })
      .catch(() => {
        handleDisplayDash('ADMIN')
        navigate('/')
      })
      .finally(() => setLoading(false))
  }, [])

  return { verifyFrequency }
}
