import { Breadcrumbs, Chip, Link } from "@mui/material";
import { useAppThemeContext, useDrawerContext } from "../../contexts";
import { Home } from "@mui/icons-material";

export const TitleAdminDash = () => {
  const { handleClickButtonTools } = useDrawerContext();

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link
        underline="none"
        color="inherit"
        href="/"
        onClick={handleClickButtonTools}
      >
        <Chip
          color="primary"
          variant="filled"
          label="Página Inicial"
          icon={<Home sx={{ mr: 0.5 }} fontSize="inherit" />}
        />
      </Link>
    </Breadcrumbs>
  );
};

interface iTitleAdminDashPagesProps {
  breadcrumbs: JSX.Element[];
}

export const TitleAdminDashPages = ({
  breadcrumbs,
}: iTitleAdminDashPagesProps) => {
  const { mdDown } = useAppThemeContext();
  const { handleClickButtonTools } = useDrawerContext();

  return (
    <Breadcrumbs maxItems={mdDown ? 2 : undefined} aria-label="breadcrumb">
      <Link
        underline="none"
        color="inherit"
        href="/"
        onClick={handleClickButtonTools}
      >
        <Chip
          clickable
          color="primary"
          variant="outlined"
          label="Página Inicial"
          icon={<Home sx={{ mr: 0.5 }} fontSize="inherit" />}
        />
      </Link>
      {breadcrumbs}
    </Breadcrumbs>
  );
};
