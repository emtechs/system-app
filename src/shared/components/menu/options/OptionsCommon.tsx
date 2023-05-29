import { Frequency } from "./Frequency";
import { useDrawerContext } from "../../../contexts";
import { AccountBox, Checklist, Home, Summarize } from "@mui/icons-material";
import { Profile } from "./Profile";
import { ListItemLinkOpen, OtherListItemLink } from "../item";
import { Report } from "./Report";

export const OptionsCommon = () => {
  const {
    handleClick,
    handleClickFrequency,
    handleClickProfile,
    handleClickReport,
    openFrequency,
    openProfile,
    openReport,
  } = useDrawerContext();
  return (
    <>
      <OtherListItemLink
        onClick={handleClick}
        icon={<Home />}
        label="Página Inicial"
      />
      <ListItemLinkOpen
        onClick={handleClickFrequency}
        open={openFrequency}
        icon={<Checklist />}
        label="Frequências"
      >
        <Frequency />
      </ListItemLinkOpen>
      <ListItemLinkOpen
        onClick={handleClickReport}
        open={openReport}
        icon={<Summarize />}
        label="Relatórios"
      >
        <Report />
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
  );
};
