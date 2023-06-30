import { IconButton, Tooltip } from "@mui/material";
import { usePaginationContext } from "../../../contexts";
import { Check, Close } from "@mui/icons-material";

export const ActiveButton = () => {
  const { active, setActive } = usePaginationContext();

  const onClick = () => setActive(!active);

  return active ? (
    <Tooltip title="Ativas">
      <IconButton color="success" onClick={onClick}>
        <Check />
      </IconButton>
    </Tooltip>
  ) : (
    <Tooltip title="Desativas">
      <IconButton color="error" onClick={onClick}>
        <Close />
      </IconButton>
    </Tooltip>
  );
};
