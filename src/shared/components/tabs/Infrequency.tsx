import { Box, Tabs, Tab } from '@mui/material'
import { Link } from 'react-router-dom'
import { useCalendarContext } from '../../contexts'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/pt-br'
dayjs.extend(localizedFormat)

interface iTabsInfrequencyPageProps {
  href: string
  value?: string
  date?: string
}

export const TabsInfrequencyPage = ({
  date = 'Hoje',
  href,
  value = '',
}: iTabsInfrequencyPageProps) => {
  const { listYear } = useCalendarContext()

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={value} variant="scrollable" scrollButtons="auto">
        <Tab
          label={date}
          value=""
          component={Link}
          to={`${href}?date=${dayjs().format('DD/MM/YYYY')}`}
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
