import { Link } from "react-router-dom";
import { useAppThemeContext } from "../../contexts";
import { iButtonBaseProps } from "../../interfaces";
import { ButtonMdDown } from "./MdDown";
import { Button, IconButton, Tooltip } from "@mui/material";

interface iButtonDestProps extends iButtonBaseProps {
  to: string;
  isResp?: boolean;
  isHome?: boolean;
}

export const ButtonDest = ({
  to,
  title,
  startIcon,
  endIcon,
  onClick,
  isResp,
  isHome,
}: iButtonDestProps) => {
  const { smDown } = useAppThemeContext();

  return (
    <Link to={to}>
      {isResp ? (
        <ButtonMdDown
          title={title}
          startIcon={startIcon}
          endIcon={endIcon}
          onClick={onClick}
        />
      ) : isHome ? (
        smDown && (
          <Tooltip title={title}>
            <IconButton color="primary" onClick={onClick}>
              {startIcon && startIcon}
              {endIcon && endIcon}
            </IconButton>
          </Tooltip>
        )
      ) : (
        <Button
          variant="contained"
          disableElevation
          startIcon={startIcon}
          endIcon={endIcon}
          onClick={onClick}
        >
          {title}
        </Button>
      )}
    </Link>
  );
};
