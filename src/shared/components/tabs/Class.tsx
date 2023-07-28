import {
  Checklist,
  Groups,
  Percent,
  School,
  Workspaces,
} from '@mui/icons-material'
import { Box, Tab, Tabs } from '@mui/material'
import { useClassContext } from '../../contexts'
import { iTabsBaseProps } from '../../interfaces'

export const TabsClassRetrievePage = ({
  value,
  handleChange,
}: iTabsBaseProps) => {
  const { classRetrieve } = useClassContext()

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab icon={<Workspaces />} label="Turma" value="" />
        <Tab icon={<School />} label="Escolas" value="school" />
        <Tab
          icon={<Groups />}
          label="Alunos"
          disabled={classRetrieve?.schools === 0}
          value="student"
        />
        <Tab
          icon={<Checklist />}
          label="Frequências"
          disabled={classRetrieve?.schools === 0}
          value="frequency"
        />
        <Tab
          icon={<Percent />}
          label="Infrequência"
          disabled={classRetrieve?.frequencies === 0}
          value="infrequency"
        />
      </Tabs>
    </Box>
  )
}
