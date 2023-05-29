import { Class } from "./Class";
import { Frequency } from "./Frequency";
import { Import } from "./Import";
import { Report } from "./Report";
import { School } from "./School";
import { Student } from "./Student";
import { User } from "./User";
import { useDrawerContext } from "../../../contexts";
import {
  AccountBox,
  Checklist,
  FileUpload,
  Groups,
  Home,
  People,
  School as SchoolIcon,
  Summarize,
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
    handleClickReport,
    handleClickSchool,
    handleClickStudent,
    handleClickUser,
    openClass,
    openFrequency,
    openImport,
    openProfile,
    openReport,
    openSchool,
    openStudent,
    openUser,
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
        onClick={handleClickSchool}
        open={openSchool}
        icon={<SchoolIcon />}
        label="Escolas"
      >
        <School />
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
