import { Edit, Password } from "@mui/icons-material";
import { ListItemIcon, Menu, MenuItem } from "@mui/material";

interface iMenuBaseProps {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
}

export const MenuUser = ({ anchorEl, handleClose }: iMenuBaseProps) => {
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
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <Edit />
        </ListItemIcon>
        Editar Perfil
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <Password />
        </ListItemIcon>
        Editar Senha
      </MenuItem>
    </Menu>
  );
};
