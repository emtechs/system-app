import {
  AccountBox,
  Groups,
  Home,
  People,
  Summarize,
  Workspaces,
} from "@mui/icons-material";
import { useDrawerContext } from "../../../contexts";
import { ListItemLinkOpen, OtherListItemLink } from "../item";
import { Class, Profile, Student, User } from "../components";

export const OptionsSchool = () => {
  const {
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
      <OtherListItemLink icon={<Home />} label="Página Inicial" />
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
      <OtherListItemLink icon={<Summarize />} label="Relatório" to="report" />
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
