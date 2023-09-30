import { Box, Tabs, Tab } from '@mui/material'
import { Link } from 'react-router-dom'

interface iTabsSchoolPageProps {
  value?: string
}

export const TabsSchoolPage = ({ value = '' }: iTabsSchoolPageProps) => {
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={value} variant="scrollable" scrollButtons="auto">
        <Tab label="Escolas" value="" component={Link} to={'/school'} />
        <Tab
          label="% Utilização"
          value="util"
          component={Link}
          to={'/school?view=util'}
        />
      </Tabs>
    </Box>
  )
}
