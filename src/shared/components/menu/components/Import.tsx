import { Groups, School, Workspaces } from '@mui/icons-material'
import { List } from '@mui/material'
import { ListItemLink } from '../item'

export const Import = () => {
  return (
    <List component="div" disablePadding>
      <ListItemLink icon={<School />} label="Escolas" to="import/school" />
      <ListItemLink icon={<Workspaces />} label="Turmas" to="import/class" />
      <ListItemLink icon={<Groups />} label="Alunos" to="import/student" />
    </List>
  )
}
