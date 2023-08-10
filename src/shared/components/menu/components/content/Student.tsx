import { AddBox, Groups3 } from '@mui/icons-material'
import { List } from '@mui/material'
import { ListItemLink } from '../item'

export const Student = () => {
  return (
    <List component="div" disablePadding>
      <ListItemLink icon={<AddBox />} label="Novo" to="student/create" />
      <ListItemLink icon={<Groups3 />} label="Listar" to="student/list" />
    </List>
  )
}
