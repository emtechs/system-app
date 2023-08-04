import { useFormContext } from 'react-hook-form'
import { Box } from '@mui/material'
import { iSelectBase, useAuthContext } from '../../../../shared'
import { DateDashboardSchoolReportPage } from '../date'

export const ContentReportCustom = () => {
  const { watch } = useFormContext()
  const { yearData } = useAuthContext()
  const yearSelect: iSelectBase | undefined = watch('year')

  if (yearData && yearSelect)
    return (
      <Box display="flex" gap={1} flexDirection="column">
        <DateDashboardSchoolReportPage
          name="initial"
          label="Início"
          isYearData={yearData.year === yearSelect.label}
          yearSelect={yearSelect}
        />
        <DateDashboardSchoolReportPage
          name="final"
          label="Fim"
          isYearData={yearData.year === yearSelect.label}
          yearSelect={yearSelect}
        />
      </Box>
    )

  return <></>
}
