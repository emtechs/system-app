import { Box, Tab, Tabs } from '@mui/material'
import { ReactElement } from 'react'
import { Link } from 'react-router-dom'

interface iTabsBaseProps {
  value?: string
  elemArr: {
    icon: ReactElement<unknown, string>
    disabled?: boolean
    label: string
    value: string
    href: string
  }[]
}

export const TabsBase = ({ value = '', elemArr }: iTabsBaseProps) => {
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={value} variant="scrollable" scrollButtons="auto">
        {elemArr.map((el) => (
          <Tab
            key={el.value}
            icon={el.icon}
            label={el.label}
            disabled={el.disabled}
            value={el.value}
            component={Link}
            to={el.href}
          />
        ))}
      </Tabs>
    </Box>
  )
}
