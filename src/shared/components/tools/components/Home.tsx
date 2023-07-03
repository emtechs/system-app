import { IconButton, Tooltip } from "@mui/material";
import { Home } from "@mui/icons-material";
import { useAppThemeContext, useDrawerContext } from "../../../contexts";

interface iHomeButtonProps {
  to: string;
}

export const HomeButton = ({ to }: iHomeButtonProps) => {
  const { smDown } = useAppThemeContext();
  const { handleClickButtonTools } = useDrawerContext();
  return (
    smDown && (
      <Tooltip title="Página Inicial">
        <IconButton href={to} color="primary" onClick={handleClickButtonTools}>
          <Home />
        </IconButton>
      </Tooltip>
    )
  );
};
