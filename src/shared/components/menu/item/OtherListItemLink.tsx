import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
export interface iOtherListItemLinkProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}

export const OtherListItemLink = ({
  icon,
  label,
  onClick,
}: iOtherListItemLinkProps) => {
  const location = useLocation();
  return (
    <Link to="/">
      <ListItemButton
        autoFocus={true}
        onClick={onClick}
        selected={location.pathname === "/"}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    </Link>
  );
};
