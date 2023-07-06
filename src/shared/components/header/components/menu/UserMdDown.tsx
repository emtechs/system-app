import {
  Edit,
  ExpandLess,
  ExpandMore,
  Logout,
  Password,
  Person,
} from "@mui/icons-material";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { useAuthContext } from "../../../../contexts";

interface iMenuBaseProps {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  label: string;
  open: boolean;
  onClick: () => void;
}

export const MenuUserMdDown = ({
  anchorEl,
  handleClose,
  label,
  onClick,
  open,
}: iMenuBaseProps) => {
  const { logout } = useAuthContext();
  return (
    <Menu
      sx={{ mt: "45px" }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={onClick}>
        <ListItemIcon>
          <Person />
        </ListItemIcon>
        <ListItemText primary={label} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </MenuItem>
      <Collapse in={open}>
        <List component="div">
          <ListItemButton onClick={handleClose}>
            <ListItemIcon>
              <Edit />
            </ListItemIcon>
            <ListItemText primary="Editar Perfil" />
          </ListItemButton>
          <ListItemButton onClick={handleClose}>
            <ListItemIcon>
              <Password />
            </ListItemIcon>
            <ListItemText primary="Editar Senha" />
          </ListItemButton>
        </List>
      </Collapse>
      <MenuItem
        onClick={() => {
          handleClose();
          logout();
        }}
      >
        <ListItemIcon>
          <Logout />
        </ListItemIcon>
        <ListItemText primary="Sair" />
      </MenuItem>
    </Menu>
  );
};
