import { MouseEvent, useState } from "react";
import {
  Edit,
  ExpandLess,
  ExpandMore,
  Person,
  School,
} from "@mui/icons-material";
import {
  Button,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { useAppThemeContext, useSchoolContext } from "../../../contexts";

export const SchoolTools = () => {
  const { mdDown } = useAppThemeContext();
  const { handleOpenEdit, handleOpenDirector } = useSchoolContext();
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
            <School />
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
          startIcon={<School />}
          endIcon={open ? <ExpandLess /> : <ExpandMore />}
        >
          Escola
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
        <MenuItem
          onClick={() => {
            handleOpenDirector();
            handleClose();
          }}
        >
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          Diretor
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleOpenEdit();
            handleClose();
          }}
        >
          <ListItemIcon>
            <Edit />
          </ListItemIcon>
          Editar
        </MenuItem>
      </Menu>
    </>
  );
};
