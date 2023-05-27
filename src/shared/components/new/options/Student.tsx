import { AddBox, ExpandLess, ExpandMore, Groups } from "@mui/icons-material";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { useState } from "react";

export const Student = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(!open);
  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <Groups />
        </ListItemIcon>
        <ListItemText primary="Alunos" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open}>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: theme.spacing(4) }}>
            <ListItemIcon>
              <AddBox />
            </ListItemIcon>
            <ListItemText primary="Novo" />
          </ListItemButton>
        </List>
      </Collapse>
    </>
  );
};
