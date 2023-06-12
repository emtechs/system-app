import {
  AddBox,
  DoneAll,
  Edit,
  Person,
  PersonAdd,
  School as SchoolIcon,
  SchoolTwoTone,
  Workspaces,
} from "@mui/icons-material";
import { List } from "@mui/material";
import { ListItemLink } from "../item";

export const School = () => {
  return (
    <List component="div" disablePadding>
      <ListItemLink icon={<AddBox />} label="Nova" to="school/create" />
      <ListItemLink
        icon={<SchoolIcon />}
        label="Escola"
        to="school?order=name"
      />
      <ListItemLink
        icon={<Person />}
        label="Diretor"
        to="school/define/diret"
      />
      <ListItemLink
        icon={<PersonAdd />}
        label="Servidor"
        to="school/create/server"
      />
      <ListItemLink icon={<Edit />} label="Editar" to="school/edit" />
      <ListItemLink icon={<Workspaces />} label="Turmas" to="school/class" />
      <ListItemLink
        icon={<SchoolTwoTone />}
        label="Listar"
        to="school/list?order=name"
      />
      <ListItemLink
        icon={<DoneAll />}
        label="Ativar"
        to="school/active?order=name"
      />
    </List>
  );
};
