import {
  AccountBox,
  Checklist,
  Groups,
  Home,
  Percent,
  Summarize,
  Workspaces,
} from '@mui/icons-material'
import {
  useAppThemeContext,
  useSchoolContext,
  useDrawerContext,
} from '../../../contexts'
import { OtherListItemLink, ListItemLinkOpen, Profile } from '../components'

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
      <OtherListItemLink
        icon={<Percent />}
        label="Infrequência"
        baseHref={baseHref}
        to="/infrequency"
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
