import {
  AddBox,
  DoneAll,
  Edit,
  SchoolTwoTone,
  Groups,
} from "@mui/icons-material";
import { List } from "@mui/material";
import { ListItemLink } from "../item";

export const Class = () => {
  return (
    <List component="div" disablePadding>
      <ListItemLink icon={<AddBox />} label="Nova" to="class/create" />
      <ListItemLink
        icon={<SchoolTwoTone />}
        label="Escolas"
        to="class/define/school"
      />
      <ListItemLink icon={<Edit />} label="Editar" to="class/edit" />
      <ListItemLink icon={<Groups />} label="Listar" to="class/list" />
      <ListItemLink icon={<DoneAll />} label="Ativar" to="class/active" />
    </List>
  );
};
