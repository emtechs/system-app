import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface iListItemLinkProps {
  icon: ReactNode;
  label: string;
  to: string;
}

export const ListItemLink = ({ icon, label, to }: iListItemLinkProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const onClick = () => navigate(to);
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
