import { Groups, Workspaces } from "@mui/icons-material";
import { List } from "@mui/material";
import { ListItemLink } from "../item";

export const Report = () => {
  return (
    <List component="div" disablePadding>
      <ListItemLink icon={<Workspaces />} label="Todos" to="report/class" />
      <ListItemLink
        icon={<Groups />}
        label="Turma"
        to="report/class/retrieve"
      />
    </List>
  );
};
