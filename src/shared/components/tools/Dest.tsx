import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button, IconButton, Tooltip } from "@mui/material";
import { useAppThemeContext } from "../../contexts";

interface iDestProps {
  to: string;
  title: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  onClick?: () => void;
  isResp?: boolean;
  isHome?: boolean;
}

export const Dest = ({
  to,
  title,
  startIcon,
  endIcon,
  onClick,
  isResp,
  isHome,
}: iDestProps) => {
  const { mdDown, smDown } = useAppThemeContext();

  return (
    <Link to={to}>
      {isResp ? (
        mdDown ? (
          <Tooltip title={title}>
            <IconButton color="primary" onClick={onClick}>
              {startIcon && startIcon}
              {endIcon && endIcon}
            </IconButton>
          </Tooltip>
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
        )
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
