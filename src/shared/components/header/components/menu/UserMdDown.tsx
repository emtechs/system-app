import {
  Edit,
  ExpandLess,
  ExpandMore,
  Home,
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
import { useNavigate } from "react-router-dom";

interface iMenuBaseProps {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  label: string;
  open: boolean;
  onClick: () => void;
  isHome?: boolean;
}

export const MenuUserMdDown = ({
  anchorEl,
  handleClose,
  label,
  onClick,
  open,
  isHome,
}: iMenuBaseProps) => {
  const navigate = useNavigate();
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
      {isHome && (
        <MenuItem
          onClick={() => {
            navigate("/");
            handleClose();
          }}
        >
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Início" />
        </MenuItem>
      )}
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
