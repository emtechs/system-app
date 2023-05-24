import {
  AddBox,
  DoneAll,
  Edit,
  ExpandLess,
  ExpandMore,
  FileUpload,
  Person,
  PersonAdd,
  School as SchoolIcon,
  SchoolTwoTone,
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

export const School = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(!open);
  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <SchoolIcon />
        </ListItemIcon>
        <ListItemText primary="Escolas" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open}>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: theme.spacing(3) }}>
            <ListItemIcon>
              <AddBox />
            </ListItemIcon>
            <ListItemText primary="Nova" />
          </ListItemButton>
          <ListItemButton sx={{ pl: theme.spacing(3) }}>
            <ListItemIcon>
              <FileUpload />
            </ListItemIcon>
            <ListItemText primary="Importar" />
          </ListItemButton>
          <ListItemButton sx={{ pl: theme.spacing(3) }}>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary="Diretor" />
          </ListItemButton>
          <ListItemButton sx={{ pl: theme.spacing(3) }}>
            <ListItemIcon>
              <PersonAdd />
            </ListItemIcon>
            <ListItemText primary="Servidor" />
          </ListItemButton>
          <ListItemButton sx={{ pl: theme.spacing(3) }}>
            <ListItemIcon>
              <Edit />
            </ListItemIcon>
            <ListItemText primary="Editar" />
          </ListItemButton>
          <ListItemButton sx={{ pl: theme.spacing(3) }}>
            <ListItemIcon>
              <SchoolTwoTone />
            </ListItemIcon>
            <ListItemText primary="Listar" />
          </ListItemButton>
          <ListItemButton sx={{ pl: theme.spacing(3) }}>
            <ListItemIcon>
              <DoneAll />
            </ListItemIcon>
            <ListItemText primary="Ativar" />
          </ListItemButton>
        </List>
      </Collapse>
    </>
  );
};
