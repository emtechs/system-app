import { AddBox, Checklist, ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { useState } from "react";

export const Frequency = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(!open);
  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <Checklist />
        </ListItemIcon>
        <ListItemText primary="Frequências" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open}>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: theme.spacing(4) }}>
            <ListItemIcon>
              <AddBox />
            </ListItemIcon>
            <ListItemText primary="Nova" />
          </ListItemButton>
          <ListItemButton sx={{ pl: theme.spacing(4) }}>
            <ListItemIcon>
              <Checklist />
            </ListItemIcon>
            <ListItemText primary="Realizar" />
          </ListItemButton>
        </List>
      </Collapse>
    </>
  );
};
