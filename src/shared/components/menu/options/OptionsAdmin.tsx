import {
  AccountBox,
  Checklist,
  FileUpload,
  Groups,
  Home,
  People,
  School,
  Workspaces,
} from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { useDrawerContext } from "../../../contexts";
import { Class, Frequency, Import, Profile, Student } from "../components";
import { ListItemLinkOpen, OtherListItemLink } from "../item";
import { OptionsSchoolHome } from "./OptionsSchoolHome";

export const OptionsAdmin = () => {
  const location = useLocation();
  const {
    handleClick,
    handleClickClass,
    handleClickFrequency,
    handleClickImport,
    handleClickProfile,
    handleClickStudent,
    openClass,
    openFrequency,
    openImport,
    openProfile,
    openStudent,
  } = useDrawerContext();

  return location.pathname.includes("/home/school") ? (
    <OptionsSchoolHome />
  ) : (
    <>
      <OtherListItemLink
        onClick={handleClick}
        icon={<Home />}
        label="Página Inicial"
      />
      <OtherListItemLink
        onClick={handleClick}
        icon={<People />}
        label="Usuários"
        to="/user"
      />
      <OtherListItemLink
        onClick={handleClick}
        icon={<School />}
        label="Escolas"
        to="/school"
      />
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
      <ListItemLinkOpen
        onClick={handleClickFrequency}
        open={openFrequency}
        icon={<Checklist />}
        label="Frequências"
      >
        <Frequency />
      </ListItemLinkOpen>
      <ListItemLinkOpen
        onClick={handleClickImport}
        open={openImport}
        icon={<FileUpload />}
        label="Importar"
      >
        <Import />
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
