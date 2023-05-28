import { AddBox, Checklist } from "@mui/icons-material";
import { List } from "@mui/material";
import { ListItemLink } from "../item";

export const Frequency = () => {
  return (
    <List component="div" disablePadding>
      <ListItemLink icon={<AddBox />} label="Nova" to="frequency/create" />
      <ListItemLink
        icon={<Checklist />}
        label="Realizar"
        to="frequency/list"
      />
    </List>
  );
};
