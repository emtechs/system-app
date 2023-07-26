import {
  AccountBox,
  Checklist,
  FileUpload,
  Groups,
  Home,
  People,
  School,
  Workspaces,
} from '@mui/icons-material'
import { useDrawerContext } from '../../../contexts'
import { Frequency, Import, Profile } from '../components'
import { ListItemLinkOpen, OtherListItemLink } from '../item'

export const OptionsAdmin = () => {
  const {
    handleClickFrequency,
    handleClickImport,
    handleClickProfile,
    openFrequency,
    openImport,
    openProfile,
  } = useDrawerContext()

  return (
    <>
      <OtherListItemLink icon={<Home />} label="Página Inicial" />
      <OtherListItemLink icon={<People />} label="Usuários" to="user" />
      <OtherListItemLink icon={<School />} label="Escolas" to="school" />
      <OtherListItemLink icon={<Workspaces />} label="Turmas" to="class" />
      <OtherListItemLink icon={<Groups />} label="Alunos" to="student" />
      <ListItemLinkOpen
        onClick={handleClickFrequency}
        open={openFrequency}
        icon={<Checklist />}
        label="Frequências"
      >
        <Frequency />
      </ListItemLinkOpen>
      <ListItemLinkOpen
        onClick={handleClickImport}
        open={openImport}
        icon={<FileUpload />}
        label="Importar"
      >
        <Import />
      </ListItemLinkOpen>
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
