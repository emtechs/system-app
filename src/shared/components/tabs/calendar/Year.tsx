import { Tabs, Tab } from '@mui/material'
import { useEffect } from 'react'
import { useCalendarContext } from '../../../contexts'
import { iTabsBaseProps } from '../../../interfaces'

export const TabsYear = ({ value, handleChange }: iTabsBaseProps) => {
  const { listYear } = useCalendarContext()
  const { setYearIdSelect } = useCalendarContext()

  useEffect(() => {
    const newValue = Number(value)
    setYearIdSelect(listYear[newValue].id)
  }, [value])

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      orientation="vertical"
      variant="scrollable"
      sx={{ borderRight: 1, borderColor: 'divider' }}
    >
      {listYear.map((el, index) => (
        <Tab key={el.id} label={el.year} value={index} />
      ))}
    </Tabs>
  )
}
