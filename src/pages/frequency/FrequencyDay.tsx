import { useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { useVerifySchool } from '../../shared'
import { ViewFrequencyDayPage } from './view'

export const FrequencyDayPage = () => {
  const { school_id, frequency_id } = useParams()
  const { verifySchool } = useVerifySchool()

  useEffect(() => {
    if (school_id) verifySchool(school_id)
  }, [school_id])

  if (frequency_id) return <Outlet />

  return <ViewFrequencyDayPage />
}
