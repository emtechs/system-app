import { Box, Tabs, Tab } from '@mui/material'
import { Link } from 'react-router-dom'

interface iTabsDashboardSchoolReportPageProps {
  href: string
  value?: string
}

export const TabsDashboardSchoolReportPage = ({
  href,
  value = '',
}: iTabsDashboardSchoolReportPageProps) => {
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={value} variant="scrollable" scrollButtons="auto">
        <Tab label="Período" value="" component={Link} to={href} />
        <Tab
          label="Personalizado"
          value="custom"
          component={Link}
          to={`${href}?view=custom`}
        />
      </Tabs>
    </Box>
  )
}
