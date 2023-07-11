import { Breadcrumbs, Chip, Link } from "@mui/material";
import { Home, Workspaces } from "@mui/icons-material";
import { useAppThemeContext } from "../../../contexts";
import { LabelClass } from "../../label";

export const TitleClassRetrievePage = () => {
  const { mdDown } = useAppThemeContext();

  return (
    <Breadcrumbs maxItems={mdDown ? 2 : undefined} aria-label="breadcrumb">
      <Link underline="none" color="inherit" href="/">
        <Chip
          clickable
          color="primary"
          variant="outlined"
          label={mdDown ? "..." : "Página Inicial"}
          icon={<Home sx={{ mr: 0.5 }} fontSize="inherit" />}
        />
      </Link>
      <Link underline="none" color="inherit" href="/school">
        <Chip
          clickable
          color="primary"
          variant="outlined"
          label={mdDown ? "..." : "Turmas"}
          icon={<Workspaces sx={{ mr: 0.5 }} fontSize="inherit" />}
        />
      </Link>
      <LabelClass />
    </Breadcrumbs>
  );
};
