import { Navigate, useParams } from 'react-router-dom'
import { ViewDashboardSchoolFrequencyDataPage } from './view'

export const DataDashboardSchoolPage = () => {
  const { view, id } = useParams()

  if (!id) return <Navigate to="/" />

  switch (view) {
    case 'frequency':
      return <ViewDashboardSchoolFrequencyDataPage frequency_id={id} />
    default:
      return <></>
  }
}
