import { MouseEvent, useState } from "react";
import {
  Edit,
  ExpandLess,
  ExpandMore,
  Person,
  PersonAdd,
  School,
  Workspaces,
} from "@mui/icons-material";
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
import { Link } from "react-router-dom";

interface iSchoolDashProps {
  school_id: string;
}

export const SchoolDash = ({ school_id }: iSchoolDashProps) => {
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
        <Link to={"/school/define/diret?id=" + school_id}>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            Diretor
          </MenuItem>
        </Link>
        <Link to={"/school/create/server?id=" + school_id}>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <PersonAdd />
            </ListItemIcon>
            Servidor
          </MenuItem>
        </Link>
        <Link to={"/school/edit?id=" + school_id}>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Edit />
            </ListItemIcon>
            Editar
          </MenuItem>
        </Link>
        <Link to={"/school/class?id=" + school_id}>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Workspaces />
            </ListItemIcon>
            Turmas
          </MenuItem>
        </Link>
      </Menu>
    </>
  );
};
