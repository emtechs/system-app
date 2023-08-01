import { Box, Tabs, Tab } from '@mui/material'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../contexts'

interface iTabsFrequencyPageProps {
  href?: string
  value?: string
}

export const TabsFrequencyPage = ({
  href = '/frequency',
  value = '',
}: iTabsFrequencyPageProps) => {
  const { listYear } = useAuthContext()

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={value} variant="scrollable" scrollButtons="auto">
        <Tab label="Frequências" value="" component={Link} to={href} />
        <Tab
          label="Em Aberto"
          value="none"
          component={Link}
          to={`${href}?year_id=none`}
        />
        {listYear?.map((el) => (
          <Tab
            key={el.id}
            label={el.year}
            value={el.id}
            component={Link}
            to={`${href}?year_id=${el.id}`}
          />
        ))}
      </Tabs>
    </Box>
  )
}
