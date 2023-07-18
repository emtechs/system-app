import { useDrawerContext } from "../../../contexts";
import {
  AccountBox,
  Groups,
  Home,
  People,
  Summarize,
  Workspaces,
} from "@mui/icons-material";
import { Profile } from "../components/Profile";
import { ListItemLinkOpen, OtherListItemLink } from "../item";
import { User } from "../components/User";
import { Class } from "../components/Class";
import { Student } from "../components/Student";

export const OptionsSchoolHome = () => {
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
      <OtherListItemLink
        icon={<Home />}
        label="Página Inicial"
        to="home/school"
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
