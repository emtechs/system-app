import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ReactNode, useMemo } from "react";
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
  to = "",
}: iOtherListItemLinkProps) => {
  const href = "/" + to;
  const location = useLocation();
  const { handleClickButton } = useDrawerContext();

  const selected = useMemo(() => {
    if (to.length > 0) {
      if (location.pathname.includes("year"))
        return location.search.includes(to);
    }
    return location.pathname === href || location.pathname.includes(href + "/");
  }, [href, location, to]);

  return (
    <ListItemButton
      autoFocus={true}
      onClick={handleClickButton}
      selected={selected}
      href={href}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};
