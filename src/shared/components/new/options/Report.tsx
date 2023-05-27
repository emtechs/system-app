import {
  ExpandLess,
  ExpandMore,
  Groups,
  Summarize,
  Workspaces,
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
          <ListItemButton sx={{ pl: theme.spacing(4) }}>
            <ListItemIcon>
              <Workspaces />
            </ListItemIcon>
            <ListItemText primary="Todos" />
          </ListItemButton>
          <ListItemButton sx={{ pl: theme.spacing(4) }}>
            <ListItemIcon>
              <Groups />
            </ListItemIcon>
            <ListItemText primary="Turma" />
          </ListItemButton>
        </List>
      </Collapse>
    </>
  );
};
