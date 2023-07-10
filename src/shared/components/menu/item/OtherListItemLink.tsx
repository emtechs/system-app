import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { useDrawerContext } from "../../../contexts";

export interface iOtherListItemLinkProps {
  icon: ReactNode;
  label: string;
  to?: string;
}

export const OtherListItemLink = ({
  icon,
  label,
  to = "/",
}: iOtherListItemLinkProps) => {
  const location = useLocation();
  const { handleClickButton } = useDrawerContext();
  return (
    <ListItemButton
      autoFocus={true}
      onClick={handleClickButton}
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
