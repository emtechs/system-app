import { Tabs, Tab } from '@mui/material'
import { useCalendarContext } from '../../../contexts'
import { iTabsBaseProps } from '../../../interfaces'

export const TabsMonth = ({ value, handleChange }: iTabsBaseProps) => {
  const { listMonth } = useCalendarContext()

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      orientation="vertical"
      variant="scrollable"
      sx={{ borderRight: 1, borderColor: 'divider' }}
    >
      {listMonth?.map((el, index) => (
        <Tab key={el.id} label={el.name} value={index} />
      ))}
    </Tabs>
  )
}
