import {
  Checklist,
  Summarize,
  AccountBox,
  School as SchoolIcon,
} from '@mui/icons-material'
import { School, Frequency, Profile } from '../components'
import { ListItemLinkOpen, OtherListItemLink } from '../item'
import { useAppThemeContext, useDrawerContext } from '../../../contexts'

export const SchoolContent = () => {
  const { mdDown } = useAppThemeContext()
  const {
    handleClickSchool,
    handleClickFrequency,
    handleClickProfile,
    openSchool,
    openFrequency,
    openProfile,
  } = useDrawerContext()
  return (
    <>
      <ListItemLinkOpen
        onClick={handleClickSchool}
        open={openSchool}
        icon={<SchoolIcon />}
        label="Escola"
      >
        <School />
      </ListItemLinkOpen>
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
