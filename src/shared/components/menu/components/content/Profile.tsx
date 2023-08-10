import { Edit, Password } from '@mui/icons-material'
import { List } from '@mui/material'
import { useDrawerContext } from '../../../../contexts'
import { ListItemLink } from '../item'

export const Profile = () => {
  const { handleClickToProfile } = useDrawerContext()
  return (
    <List component="div" disablePadding>
      <ListItemLink
        icon={<Edit />}
        label="Editar Perfil"
        to="/profile/edit"
        onClick={handleClickToProfile}
      />
      <ListItemLink
        icon={<Password />}
        label="Editar Senha"
        to="/profile/edit/password"
        onClick={handleClickToProfile}
      />
    </List>
  )
}
