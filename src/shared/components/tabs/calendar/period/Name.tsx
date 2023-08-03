import { Box, Tab, Tabs } from '@mui/material'
import { iPeriod, iTabsBaseProps } from '../../../../../shared'

interface iTabsPeriodName extends iTabsBaseProps {
  listPeriod: iPeriod[]
}

export const TabsPeriodName = ({
  value,
  handleChange,
  listPeriod,
}: iTabsPeriodName) => {
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
      >
        {listPeriod.map((el, index) => (
          <Tab key={el.id} label={el.name} value={index} />
        ))}
      </Tabs>
    </Box>
  )
}
