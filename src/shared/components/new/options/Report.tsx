import {
  ExpandLess,
  ExpandMore,
  HowToReg,
  PeopleAlt,
  Person,
  PersonAdd,
  Summarize,
} from "@mui/icons-material";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { useState } from "react";

export const Report = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(!open);
  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <Summarize />
        </ListItemIcon>
        <ListItemText primary="Relatórios" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open}>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: theme.spacing(3) }}>
            <ListItemIcon>
              <PersonAdd />
            </ListItemIcon>
            <ListItemText primary="Administrador" />
          </ListItemButton>
          <ListItemButton sx={{ pl: theme.spacing(3) }}>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary="Secretário" />
          </ListItemButton>
          <ListItemButton sx={{ pl: theme.spacing(3) }}>
            <ListItemIcon>
              <PeopleAlt />
            </ListItemIcon>
            <ListItemText primary="Listar" />
          </ListItemButton>
          <ListItemButton sx={{ pl: theme.spacing(3) }}>
            <ListItemIcon>
              <HowToReg />
            </ListItemIcon>
            <ListItemText primary="Ativar" />
          </ListItemButton>
        </List>
      </Collapse>
    </>
  );
};
