import {
  AddBox,
  Checklist,
  EventAvailable,
  List as ListIcon,
  Outbox,
} from "@mui/icons-material";
import { List } from "@mui/material";
import { useCalendarContext } from "../../../contexts";
import { ListItemLink } from "../item";

export const Frequency = () => {
  const { dateData } = useCalendarContext();
  return (
    <List component="div" disablePadding>
      <ListItemLink icon={<AddBox />} label="Nova" to="frequency/create" />
      <ListItemLink
        icon={<EventAvailable />}
        label="Frequência"
        to={"frequency?date=" + dateData + "&order=name"}
      />
      <ListItemLink
        icon={<Checklist />}
        label="Realizar"
        to="frequency/realize"
      />
      <ListItemLink icon={<Outbox />} label="Em Aberto" to="frequency/list" />
      <ListItemLink icon={<ListIcon />} label="Listar" to="frequency/list" />
    </List>
  );
};
