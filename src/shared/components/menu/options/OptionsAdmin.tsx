import {
  AccountBox,
  Checklist,
  Groups,
  Home,
  People,
  School,
  Today,
  Workspaces,
} from '@mui/icons-material'
import { useDrawerContext } from '../../../contexts'
import { Profile } from '../components'
import { ListItemLinkOpen, OtherListItemLink } from '../item'

export const OptionsAdmin = () => {
  const { handleClickProfile, openProfile } = useDrawerContext()

  return (
    <>
      <OtherListItemLink icon={<Home />} label="Página Inicial" />
      <OtherListItemLink icon={<People />} label="Usuários" to="user" />
      <OtherListItemLink icon={<School />} label="Escolas" to="school" />
      <OtherListItemLink icon={<Workspaces />} label="Turmas" to="class" />
      <OtherListItemLink icon={<Groups />} label="Alunos" to="student" />
      <OtherListItemLink
        icon={<Checklist />}
        label="Frequências"
        to="frequency"
      />
      <OtherListItemLink icon={<Today />} label="Período" to="period" />
      <ListItemLinkOpen
        onClick={handleClickProfile}
        open={openProfile}
        icon={<AccountBox />}
        label="Perfil"
      >
        <Profile />
      </ListItemLinkOpen>
    </>
  )
}
