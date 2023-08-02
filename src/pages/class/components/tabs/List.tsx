import { Box, Tabs, Tab } from '@mui/material'
import { Link } from 'react-router-dom'
import { useCalendarContext } from '../../../../shared'

interface iTabsClassPageProps {
  value?: string
}

export const TabsClassPage = ({ value = '' }: iTabsClassPageProps) => {
  const { listYear } = useCalendarContext()
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={value} variant="scrollable" scrollButtons="auto">
        <Tab label="Turmas" value="" component={Link} to={'/class'} />
        {listYear?.map((el) => (
          <Tab
            key={el.id}
            label={el.year}
            value={el.id}
            component={Link}
            to={`/class?year_id=${el.id}`}
          />
        ))}
      </Tabs>
    </Box>
  )
}
