import { Frequency } from "./Frequency";
import { useDrawerContext } from "../../../contexts";
import { AccountBox, Checklist, Home } from "@mui/icons-material";
import { Profile } from "./Profile";
import { ListItemLinkOpen, OtherListItemLink } from "../item";

export const OptionsCommon = () => {
  const {
    handleClick,
    handleClickFrequency,
    handleClickProfile,
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
        onClick={handleClickFrequency}
        open={openFrequency}
        icon={<Checklist />}
        label="Frequências"
      >
        <Frequency />
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
