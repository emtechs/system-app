import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDrawerContext } from "../../../contexts";

interface iListItemLinkProps {
  icon: ReactNode;
  label: string;
  to: string;
}

export const ListItemLink = ({ icon, label, to }: iListItemLinkProps) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const location = useLocation();
  const { toggleDrawerOpen } = useDrawerContext();
  const onClick = () => {
    if (smDown) {
      toggleDrawerOpen();
    }
    navigate(to);
  };
  return (
    <ListItemButton
      onClick={onClick}
      selected={location.pathname === `/${to}`}
      sx={{ pl: theme.spacing(4) }}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};
