import { useDrawerContext } from "../../../contexts";
import {
  AccountBox,
  Groups,
  Home,
  People,
  Summarize,
  Workspaces,
} from "@mui/icons-material";
import { Profile } from "./Profile";
import { ListItemLinkOpen, OtherListItemLink } from "../item";
import { User } from "./User";
import { Class } from "./Class";
import { Student } from "./Student";

export const OptionsSchool = () => {
  const {
    handleClick,
    handleClickUser,
    handleClickClass,
    handleClickStudent,
    handleClickProfile,
    openUser,
    openClass,
    openStudent,
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
        onClick={handleClickUser}
        open={openUser}
        icon={<People />}
        label="Usuários"
      >
        <User />
      </ListItemLinkOpen>
      <ListItemLinkOpen
        onClick={handleClickClass}
        open={openClass}
        icon={<Workspaces />}
        label="Turmas"
      >
        <Class />
      </ListItemLinkOpen>
      <ListItemLinkOpen
        onClick={handleClickStudent}
        open={openStudent}
        icon={<Groups />}
        label="Alunos"
      >
        <Student />
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
