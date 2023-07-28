import { Box } from '@mui/material'
import {
  AutoCompleteClassReportPage,
  AutoCompletePeriodClassReportPage,
} from '../../autoComplete'

export const ContentClass = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      mt={1}
      gap={1.5}
      width="100%"
      p={1}
    >
      <AutoCompleteClassReportPage />
      <AutoCompletePeriodClassReportPage />
    </Box>
  )
}
