import { HowToReg, PeopleAlt, Person, PersonAdd } from "@mui/icons-material";
import { List } from "@mui/material";
import { ListItemLink } from "../item";

export const User = () => {
  return (
    <List component="div" disablePadding>
      <ListItemLink
        icon={<PersonAdd />}
        label="Administrador"
        to="user/create"
      />
      <ListItemLink
        icon={<Person />}
        label="Secretário"
        to="user/define/secret"
      />
      <ListItemLink icon={<PeopleAlt />} label="Listar" to="user/list" />
      <ListItemLink icon={<HowToReg />} label="Ativar" to="user/active" />
    </List>
  );
};
