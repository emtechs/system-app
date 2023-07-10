import { Breadcrumbs, Chip, Link } from "@mui/material";
import { Home, Workspaces } from "@mui/icons-material";

export const TitleClassPage = () => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link underline="none" color="inherit" href="/">
        <Chip
          clickable
          color="primary"
          variant="outlined"
          label="Página Inicial"
          icon={<Home sx={{ mr: 0.5 }} fontSize="inherit" />}
        />
      </Link>
      <Chip
        label="Turmas"
        color="primary"
        icon={<Workspaces sx={{ mr: 0.5 }} fontSize="inherit" />}
      />
    </Breadcrumbs>
  );
};
