import { Workspaces } from "@mui/icons-material";
import { Chip } from "@mui/material";

export const TitleClass = () => {
  return (
    <Chip
      label="Turmas"
      color="primary"
      icon={<Workspaces sx={{ mr: 0.5 }} fontSize="inherit" />}
    />
  );
};
