import { Button, IconButton, Tooltip } from "@mui/material";
import { useAppThemeContext } from "../../contexts";
import { iButtonBaseProps } from "../../interfaces";

export const ButtonSmDown = ({
  title,
  href,
  startIcon,
  endIcon,
  onClick,
  color = "primary",
}: iButtonBaseProps) => {
  const { smDown } = useAppThemeContext();

  const to = href ? { href } : undefined;

  return smDown ? (
    <Tooltip title={title}>
      <IconButton color={color} onClick={onClick} {...to}>
        {startIcon && startIcon}
        {endIcon && endIcon}
      </IconButton>
    </Tooltip>
  ) : (
    <Button
      color={color}
      variant="contained"
      disableElevation
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
      {...to}
    >
      {title}
    </Button>
  );
};
