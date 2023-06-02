import { List } from "@mui/material";
import { useAuthContext } from "../../../contexts";
import { ListItemLink } from "../item";
import { HowToReg, PeopleAlt, Person, PersonAdd } from "@mui/icons-material";

export const User = () => {
  const { dashData } = useAuthContext();
  switch (dashData) {
    case "ADMIN":
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

    case "SCHOOL":
      return (
        <List component="div" disablePadding>
          <ListItemLink
            icon={<PersonAdd />}
            label="Servidor"
            to="school/create/server"
          />
          <ListItemLink
            icon={<PeopleAlt />}
            label="Listar"
            to="school/list/server"
          />
        </List>
      );

    default:
      return <></>;
  }
};
