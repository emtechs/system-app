import { Tab } from '@mui/material'
import { Link } from 'react-router-dom'
import { TabsBaseYearPage } from './Base'

export const TabsStudentYearPage = () => {
  return (
    <TabsBaseYearPage
      href="/student"
      label="Alunos"
      NewTab={
        <Tab
          label="Não enturmados"
          value="none"
          component={Link}
          to="/student/year/none"
        />
      }
    />
  )
}
