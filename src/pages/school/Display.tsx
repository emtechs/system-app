import { useParams } from 'react-router-dom'
import {
  ViewSchoolClassPage,
  ViewSchoolServerPage,
  ViewSchoolStudentPage,
} from './view'

export const ViewSchoolPage = () => {
  const { view } = useParams()

  switch (view) {
    case 'server':
      return <ViewSchoolServerPage />
    case 'class':
      return <ViewSchoolClassPage />
    case 'student':
      return <ViewSchoolStudentPage />
    case 'frequency':
      return <></>
    case 'infrequency':
      return <></>
  }

  return <></>
}
