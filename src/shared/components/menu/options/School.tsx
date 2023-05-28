import {
  AddBox,
  DoneAll,
  Edit,
  Person,
  PersonAdd,
  SchoolTwoTone,
} from "@mui/icons-material";
import { List } from "@mui/material";
import { ListItemLink } from "../item";

export const School = () => {
  return (
    <List component="div" disablePadding>
      <ListItemLink icon={<AddBox />} label="Nova" to="school/create" />
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
      <ListItemLink icon={<SchoolTwoTone />} label="Listar" to="school/list" />
      <ListItemLink icon={<DoneAll />} label="Ativar" to="school/active" />
    </List>
  );
};
