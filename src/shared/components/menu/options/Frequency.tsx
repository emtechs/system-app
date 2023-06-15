import {
  AddBox,
  Checklist,
  EventAvailable,
  List as ListIcon,
  Outbox,
} from "@mui/icons-material";
import { List } from "@mui/material";
import { ListItemLink } from "../item";

export const Frequency = () => {
  return (
    <List component="div" disablePadding>
      <ListItemLink icon={<AddBox />} label="Nova" to="frequency/create" />
      <ListItemLink
        icon={<EventAvailable />}
        label="Frequência"
        to={"frequency"}
      />
      <ListItemLink
        icon={<Checklist />}
        label="Realizar"
        to="frequency/realize"
      />
      <ListItemLink icon={<Outbox />} label="Em Aberto" to="frequency/open" />
      <ListItemLink icon={<ListIcon />} label="Listar" to="frequency/list" />
    </List>
  );
};
