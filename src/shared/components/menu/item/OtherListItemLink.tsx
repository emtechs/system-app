import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

export interface iOtherListItemLinkProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  to?: string;
}

export const OtherListItemLink = ({
  icon,
  label,
  onClick,
  to = "/",
}: iOtherListItemLinkProps) => {
  const location = useLocation();
  return (
    <ListItemButton
      autoFocus={true}
      onClick={onClick}
      selected={
        location.pathname === to || location.pathname.includes(to + "/")
      }
      href={to}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};
