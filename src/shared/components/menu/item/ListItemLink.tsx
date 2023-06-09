import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { useDrawerContext } from "../../../contexts";
import { Link } from "react-router-dom";

interface iListItemLinkProps {
  icon: ReactNode;
  label: string;
  to: string;
}

export const ListItemLink = ({ icon, label, to }: iListItemLinkProps) => {
  const theme = useTheme();
  const location = useLocation();
  const { handleClickButton } = useDrawerContext();

  return (
    <Link to={to}>
      <ListItemButton
        onClick={handleClickButton}
        selected={location.pathname === `/${to}`}
        sx={{ pl: theme.spacing(4) }}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    </Link>
  );
};
