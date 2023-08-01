import { Box, Tabs, Tab } from '@mui/material'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../../../shared'

interface iTabsFrequencyPageProps {
  value?: string
}

export const TabsFrequencyPage = ({ value = '' }: iTabsFrequencyPageProps) => {
  const { listYear } = useAuthContext()

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={value} variant="scrollable" scrollButtons="auto">
        <Tab label="Frequências" value="" component={Link} to={'/frequency'} />
        <Tab
          label="Em Aberto"
          value="none"
          component={Link}
          to="/frequency?year_id=none"
        />
        {listYear?.map((el) => (
          <Tab
            key={el.id}
            label={el.year}
            value={el.id}
            component={Link}
            to={`/frequency?year_id=${el.id}`}
          />
        ))}
      </Tabs>
    </Box>
  )
}
