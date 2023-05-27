import {
  ExpandLess,
  ExpandMore,
  FileUpload,
  Groups,
  School,
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

export const Import = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(!open);
  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <FileUpload />
        </ListItemIcon>
        <ListItemText primary="Importar" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open}>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: theme.spacing(4) }}>
            <ListItemIcon>
              <School />
            </ListItemIcon>
            <ListItemText primary="Escolas" />
          </ListItemButton>
          <ListItemButton sx={{ pl: theme.spacing(4) }}>
            <ListItemIcon>
              <Workspaces />
            </ListItemIcon>
            <ListItemText primary="Turmas" />
          </ListItemButton>
          <ListItemButton sx={{ pl: theme.spacing(4) }}>
            <ListItemIcon>
              <Groups />
            </ListItemIcon>
            <ListItemText primary="Alunos" />
          </ListItemButton>
        </List>
      </Collapse>
    </>
  );
};
