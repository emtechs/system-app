import {
  Button,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

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
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
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
