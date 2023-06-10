import { AddBox, Checklist, List as ListIcon } from "@mui/icons-material";
import { List } from "@mui/material";
import { ListItemLink } from "../item";

export const Frequency = () => {
  return (
    <List component="div" disablePadding>
      <ListItemLink icon={<AddBox />} label="Nova" to="frequency/create" />
      <ListItemLink
        icon={<Checklist />}
        label="Realizar"
        to="frequency/realize"
      />
      <ListItemLink icon={<ListIcon />} label="Listar" to="frequency/list" />
    </List>
  );
};
