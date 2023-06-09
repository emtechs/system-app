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
}

export const Dest = ({
  to,
  title,
  startIcon,
  endIcon,
  onClick,
  isResp,
}: iDestProps) => {
  const theme = useTheme();
  const m750Down = useMediaQuery(theme.breakpoints.down(750));
  return (
    <Link to={to}>
      {isResp ? (
        m750Down ? (
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
