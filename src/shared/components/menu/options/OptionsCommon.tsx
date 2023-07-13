import {
  AccountBox,
  Checklist,
  Home,
  School as SchoolIcon,
  Summarize,
} from "@mui/icons-material";
import {
  useAppThemeContext,
  useDrawerContext,
  useSchoolContext,
} from "../../../contexts";
import { ListItemLinkOpen, OtherListItemLink } from "../item";
import { Frequency, Profile, School } from "../components";

export const OptionsCommon = () => {
  const { mdDown } = useAppThemeContext();
  const { schoolSelect } = useSchoolContext();
  const {
    handleClickSchool,
    handleClickFrequency,
    handleClickProfile,
    openSchool,
    openFrequency,
    openProfile,
  } = useDrawerContext();
  return (
    <>
      <OtherListItemLink
        icon={<Home />}
        label="Página Inicial"
        to={`/${schoolSelect?.id}`}
      />
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
        <OtherListItemLink
          icon={<Summarize />}
          label="Relatório"
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
  );
};
