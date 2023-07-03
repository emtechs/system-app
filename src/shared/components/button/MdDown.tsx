import { Button, IconButton, Tooltip } from "@mui/material";
import { useAppThemeContext } from "../../contexts";
import { iButtonBaseProps } from "../../interfaces";

export const ButtonMdDown = ({
  title,
  href,
  endIcon,
  onClick,
  startIcon,
  color = "primary",
}: iButtonBaseProps) => {
  const { mdDown } = useAppThemeContext();

  const to = href ? { href } : undefined;

  return mdDown ? (
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
