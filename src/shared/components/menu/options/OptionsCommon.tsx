import { Frequency } from "./Frequency";
import { useDrawerContext } from "../../../contexts";
import {
  AccountBox,
  Checklist,
  Home,
  School as SchoolIcon,
  Summarize,
} from "@mui/icons-material";
import { Profile } from "./Profile";
import { ListItemLinkOpen, OtherListItemLink } from "../item";
import { School } from "./School";

export const OptionsCommon = () => {
  const {
    handleClick,
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
        onClick={handleClick}
        icon={<Home />}
        label="Página Inicial"
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
      <OtherListItemLink
        onClick={handleClick}
        icon={<Summarize />}
        label="Relatório"
        to="/report"
      />
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
