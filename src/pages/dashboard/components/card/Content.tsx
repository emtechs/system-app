import { useFormContext } from 'react-hook-form'
import {
  AutoCompleteClassReportPage,
  AutoCompleteStudentReportPage,
} from '../autoComplete'
import { Box } from '@mui/material'

export const ContentReport = () => {
  const { watch } = useFormContext()
  const type: string = watch('type')

  switch (type) {
    case 'class':
      return <AutoCompleteClassReportPage />

    case 'student':
      return (
        <Box display="flex" flexDirection="column" gap={1.5} width="100%" p={1}>
          <AutoCompleteClassReportPage />
          <AutoCompleteStudentReportPage />
        </Box>
      )

    default:
      return <></>
  }
}
