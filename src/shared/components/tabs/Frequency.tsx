import { Box, Tabs, Tab } from '@mui/material'
import { Link } from 'react-router-dom'
import { useCalendarContext } from '../../contexts'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/pt-br'
dayjs.extend(localizedFormat)

interface iTabsFrequencyPageProps {
  href?: string
  value?: string
  date?: string
}

export const TabsFrequencyPage = ({
  href = '/frequency',
  value = '',
  date = 'Hoje',
}: iTabsFrequencyPageProps) => {
  const { listYear } = useCalendarContext()

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={value} variant="scrollable" scrollButtons="auto">
        <Tab label="Frequências" value="" component={Link} to={href} />
        <Tab
          label={date}
          value="day"
          component={Link}
          to={`${href}?year_id=day&date=${dayjs().format('DD/MM/YYYY')}`}
        />
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
