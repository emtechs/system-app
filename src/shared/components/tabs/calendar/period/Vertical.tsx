import { Tab, Tabs } from '@mui/material'
import { iTabsBaseProps } from '../../../../interfaces'

export const TabsPeriodVertical = ({ value, handleChange }: iTabsBaseProps) => {
  return (
    <Tabs
      value={value}
      onChange={handleChange}
      orientation="vertical"
      variant="scrollable"
      sx={{ borderRight: 1, borderColor: 'divider' }}
    >
      <Tab label="Ano" value="ANO" />
      <Tab label="Bimestre" value="BIMESTRE" />
      <Tab label="Semestre" value="SEMESTRE" />
    </Tabs>
  )
}
