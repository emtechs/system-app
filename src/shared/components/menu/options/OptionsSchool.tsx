import {
  AccountBox,
  Checklist,
  Groups,
  Home,
  Summarize,
  Workspaces,
} from '@mui/icons-material'
import {
  useAppThemeContext,
  useDrawerContext,
  useSchoolContext,
} from '../../../contexts'
import { Frequency, Profile } from '../components'
import { ListItemLinkOpen, OtherListItemLink } from '../item'

export const OptionsSchool = () => {
  const { mdDown } = useAppThemeContext()
  const { schoolSelect } = useSchoolContext()
  const {
    handleClickFrequency,
    handleClickProfile,
    openFrequency,
    openProfile,
  } = useDrawerContext()
  return (
    <>
      <OtherListItemLink
        icon={<Home />}
        label="Página Inicial"
        to={`${schoolSelect?.id}`}
      />
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
      {!mdDown && (
        <OtherListItemLink icon={<Summarize />} label="Relatório" to="report" />
      )}
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
