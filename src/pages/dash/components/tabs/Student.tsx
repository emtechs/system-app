import { Box, Tabs, Tab } from '@mui/material'
import { Link } from 'react-router-dom'
import { useSchoolContext } from '../../../../shared'

interface iTabsDashboardSchoolStudentPageProps {
  value?: string
}

export const TabsDashboardSchoolStudentPage = ({
  value = '',
}: iTabsDashboardSchoolStudentPageProps) => {
  const { schoolSelect } = useSchoolContext()

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={value} variant="scrollable" scrollButtons="auto">
        <Tab
          label="Alunos"
          value=""
          component={Link}
          to={`/${schoolSelect?.id}/student`}
        />
        <Tab
          label="Faltosos"
          value="absences"
          component={Link}
          to={`/${schoolSelect?.id}/student?view=absences`}
        />
      </Tabs>
    </Box>
  )
}
