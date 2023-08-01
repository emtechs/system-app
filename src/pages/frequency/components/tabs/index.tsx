import { Box, Tabs, Tab } from '@mui/material'
import { Link } from 'react-router-dom'

interface iTabsFrequencyPageProps {
  value: string
  href: string
}

export const TabsFrequencyPage = ({ href, value }: iTabsFrequencyPageProps) => {
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={value} variant="scrollable" scrollButtons="auto">
        <Tab
          label="Bimestre"
          value="BIMESTRE"
          component={Link}
          to={`${href}?view=BIMESTRE`}
        />
        <Tab
          label="Semestre"
          value="SEMESTRE"
          component={Link}
          to={`${href}?view=SEMESTRE`}
        />
      </Tabs>
    </Box>
  )
}
