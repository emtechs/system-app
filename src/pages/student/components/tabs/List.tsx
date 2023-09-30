import { Box, Tabs, Tab } from '@mui/material'
import { Link } from 'react-router-dom'
import { useCalendarContext } from '../../../../shared'

interface iTabsStudentPageProps {
  value?: string
}

export const TabsStudentPage = ({ value = '' }: iTabsStudentPageProps) => {
  const { listYear } = useCalendarContext()

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={value} variant="scrollable" scrollButtons="auto">
        <Tab label="Alunos" value="" component={Link} to={'/student'} />
        <Tab
          label="Não enturmados"
          value="none"
          component={Link}
          to="/student?year_id=none"
        />
        <Tab
          label="Faltosos"
          value="absences"
          component={Link}
          to="/student?year_id=absences"
        />
        {listYear?.map((el) => (
          <Tab
            key={el.id}
            label={el.year}
            value={el.id}
            component={Link}
            to={`/student?year_id=${el.id}`}
          />
        ))}
      </Tabs>
    </Box>
  )
}
