import { Button, IconButton, Tooltip } from "@mui/material";
import { useAppThemeContext } from "../../contexts";
import { ClearAll } from "@mui/icons-material";

interface iResetProps {
  onClick: () => void;
  disabled: boolean;
}

export const Reset = ({ onClick, disabled }: iResetProps) => {
  const { mdDown } = useAppThemeContext();

  return mdDown ? (
    <Tooltip title="Limpar">
      <IconButton color="primary" onClick={onClick} disabled={disabled}>
        <ClearAll />
      </IconButton>
    </Tooltip>
  ) : (
    <Button
      variant="contained"
      disableElevation
      endIcon={<ClearAll />}
      onClick={onClick}
      disabled={disabled}
    >
      Limpar
    </Button>
  );
};
