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
import { Profile } from '../components'
import { ListItemLinkOpen, OtherListItemLink } from '../item'

export const OptionsSchool = () => {
  const { mdDown } = useAppThemeContext()
  const { schoolSelect } = useSchoolContext()
  const { handleClickProfile, openProfile } = useDrawerContext()
  const baseHref = `/${schoolSelect?.id}`
  return (
    <>
      <OtherListItemLink
        icon={<Home />}
        label="Página Inicial"
        baseHref={baseHref}
      />
      <OtherListItemLink
        icon={<Workspaces />}
        label="Turmas"
        baseHref={baseHref}
        to="/class"
      />
      <OtherListItemLink
        icon={<Groups />}
        label="Alunos"
        baseHref={baseHref}
        to="/student"
      />
      <OtherListItemLink
        icon={<Checklist />}
        label="Frequências"
        baseHref={baseHref}
        to="/frequency"
      />
      {!mdDown && (
        <OtherListItemLink
          icon={<Summarize />}
          label="Relatório"
          baseHref={baseHref}
          to="/report"
        />
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
