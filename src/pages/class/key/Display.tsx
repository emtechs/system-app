import { useParams } from 'react-router-dom'
import { ViewClassStudentPage } from '../view'

export const ViewClassKeyPage = () => {
  const { view } = useParams()

  switch (view) {
    case 'server':
      return <></>
    case 'class':
      return <></>
    case 'student':
      return <ViewClassStudentPage />
    case 'frequency':
      return <></>
    case 'infrequency':
      return <></>
  }

  return <></>
}
