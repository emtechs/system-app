import { Class } from "./Class";
import { Frequency } from "./Frequency";
import { Import } from "./Import";
import { Student } from "./Student";
import { useDrawerContext } from "../../../contexts";
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
import { Profile } from "./Profile";
import { ListItemLinkOpen, OtherListItemLink } from "../item";

export const OptionsAdmin = () => {
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
  return (
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
