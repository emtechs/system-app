import { Edit, Password } from "@mui/icons-material";
import { List } from "@mui/material";
import { ListItemLink } from "../item";

export const Profile = () => {
  return (
    <List component="div" disablePadding>
      <ListItemLink icon={<Edit />} label="Editar Perfil" to="import/school" />
      <ListItemLink
        icon={<Password />}
        label="Editar Senha"
        to="import/class"
      />
    </List>
  );
};
