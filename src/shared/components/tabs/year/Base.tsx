import { Box, Tab, Tabs } from '@mui/material'
import { useAuthContext } from '../../../contexts'
import { Link, useParams } from 'react-router-dom'
import { ReactNode } from 'react'

interface iTabsBaseYearPageProps {
  label: string
  href: string
  NewTab?: ReactNode
}

export const TabsBaseYearPage = ({
  label,
  href,
  NewTab,
}: iTabsBaseYearPageProps) => {
  const { year_id } = useParams()
  const { listYear } = useAuthContext()

  const value = year_id || ''

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={value} variant="scrollable" scrollButtons="auto">
        <Tab label={label} value="" component={Link} to={href} />
        {NewTab}
        {listYear?.map((el) => (
          <Tab
            key={el.id}
            label={el.year}
            value={el.id}
            component={Link}
            to={`${href}/year/${el.id}`}
          />
        ))}
      </Tabs>
    </Box>
  )
}
