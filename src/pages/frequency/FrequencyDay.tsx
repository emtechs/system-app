import { Outlet, useParams } from 'react-router-dom'
import { FrequencyPage } from './Frequency'

export const FrequencyDayPage = () => {
  const { frequency_id } = useParams()

  if (frequency_id) return <Outlet />

  return <FrequencyPage />
}
