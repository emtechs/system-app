import { useFormContext } from 'react-hook-form'
import {
  AutoCompleteClassReportPage,
  AutoCompleteStudentReportPage,
} from '../autoComplete'

export const ContentReport = () => {
  const { watch } = useFormContext()
  const type: string = watch('type')

  switch (type) {
    case 'class':
      return <AutoCompleteClassReportPage />

    case 'student':
      return <AutoCompleteStudentReportPage />

    default:
      return <></>
  }
}
