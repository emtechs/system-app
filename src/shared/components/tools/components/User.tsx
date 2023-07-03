import { MouseEvent, useState } from "react";
import { AddBox, ExpandLess, ExpandMore, PersonAdd } from "@mui/icons-material";
import {
  Button,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";

export const UserTools = () => {
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {mdDown ? (
        <Tooltip title="Escola">
          <IconButton
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            color="primary"
            onClick={handleClick}
          >
            <AddBox />
          </IconButton>
        </Tooltip>
      ) : (
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          disableElevation
          variant="contained"
          startIcon={<AddBox />}
          endIcon={open ? <ExpandLess /> : <ExpandMore />}
        >
          Novo
        </Button>
      )}

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem href="/user/create?back=/user/list" onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd />
          </ListItemIcon>
          Administrador
        </MenuItem>

        <MenuItem
          href="/user/create/director?back=/user/list"
          onClick={handleClose}
        >
          <ListItemIcon>
            <PersonAdd />
          </ListItemIcon>
          Diretor
        </MenuItem>
      </Menu>
    </>
  );
};
