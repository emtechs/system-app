import { Link, useParams } from 'react-router-dom'
import { Box, Tab, Tabs } from '@mui/material'

interface iTabsPeriodPageProps {
  value?: string
}

export const TabsPeriodRetrievePage = ({
  value = 'BIMESTRE',
}: iTabsPeriodPageProps) => {
  const { year_id } = useParams()
  const href = `/period/${year_id}`
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
