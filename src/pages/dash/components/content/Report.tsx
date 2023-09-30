import { useFormContext } from 'react-hook-form'
import { Box } from '@mui/material'
import {
  AutoCompleteClassReportPage,
  AutoCompleteStudentReportPage,
} from '../autoComplete'
import { iReport } from '../../../../shared'
import { RadioButtonGroup } from 'react-hook-form-mui'

export const ContentReport = () => {
  const { watch } = useFormContext()
  const type: iReport = watch('type')

  switch (type) {
    case 'class':
      return <AutoCompleteClassReportPage />

    case 'school':
      return (
        <RadioButtonGroup
          label="Selecione o tipo"
          name="model"
          options={[
            // { id: 'details', label: 'Detalhado' },
            { id: 'resume', label: 'Resumido' },
          ]}
          required
        />
      )

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
