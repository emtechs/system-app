import { Breadcrumbs, Chip, Link } from "@mui/material";
import {
  useAppThemeContext,
  useDrawerContext,
} from "../../../../shared/contexts";
import { Home, School } from "@mui/icons-material";

export const TitleSchool = () => {
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
      <Chip
        label="Escolas"
        color="primary"
        icon={<School sx={{ mr: 0.5 }} fontSize="inherit" />}
      />
    </Breadcrumbs>
  );
};
