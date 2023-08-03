import { Box, Tab, Tabs } from '@mui/material'
import { iTabsBaseProps } from '../../../../interfaces'

export const TabsPeriod = ({ value, handleChange }: iTabsBaseProps) => {
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="Ano" value="ANO" />
        <Tab label="Bimestre" value="BIMESTRE" />
        <Tab label="Semestre" value="SEMESTRE" />
      </Tabs>
    </Box>
  )
}
