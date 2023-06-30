import { Edit, Password } from "@mui/icons-material";
import { List } from "@mui/material";
import { ListItemLink } from "../item";

export const Profile = () => {
  return (
    <List component="div" disablePadding>
      <ListItemLink icon={<Edit />} label="Editar Perfil" to="profile/edit" />
      <ListItemLink
        icon={<Password />}
        label="Editar Senha"
        to="profile/edit/password"
      />
    </List>
  );
};
