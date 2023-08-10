import { List } from '@mui/material'
import {
  AddBox,
  DoneAll,
  Edit,
  Groups,
  SchoolTwoTone,
} from '@mui/icons-material'
import { useAuthContext } from '../../../../contexts'
import { ListItemLink } from '../item'

export const Class = () => {
  const { dashData } = useAuthContext()
  switch (dashData) {
    case 'ADMIN':
      return (
        <List component="div" disablePadding>
          <ListItemLink icon={<AddBox />} label="Nova" to="class/create" />
          <ListItemLink
            icon={<SchoolTwoTone />}
            label="Escola"
            to="class/define/school"
          />
          <ListItemLink icon={<Edit />} label="Editar" to="class/edit" />
          <ListItemLink icon={<Groups />} label="Listar" to="class/list" />
          <ListItemLink icon={<DoneAll />} label="Ativar" to="class/active" />
        </List>
      )

    case 'SCHOOL':
      return (
        <List component="div" disablePadding>
          <ListItemLink icon={<AddBox />} label="Nova" to="class/create" />
          <ListItemLink icon={<Edit />} label="Editar" to="class/edit" />
          <ListItemLink icon={<Groups />} label="Listar" to="class/list" />
        </List>
      )

    default:
      return <></>
  }
}
