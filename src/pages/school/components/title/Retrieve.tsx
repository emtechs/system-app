import { Breadcrumbs, Chip, Link } from "@mui/material";
import { Home, School } from "@mui/icons-material";
import {
  useAppThemeContext,
  useAuthContext,
  useDrawerContext,
} from "../../../../shared/contexts";
import { LabelSchool } from "../../../../shared/components";

export const TitleRetrieveSchool = () => {
  const { mdDown } = useAppThemeContext();
  const { schoolData } = useAuthContext();
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
          label={mdDown ? "..." : "Página Inicial"}
          icon={<Home sx={{ mr: 0.5 }} fontSize="inherit" />}
        />
      </Link>
      <Link underline="none" color="inherit" href="/school">
        <Chip
          clickable
          color="primary"
          variant="outlined"
          label={mdDown ? "..." : "Escolas"}
          icon={<School sx={{ mr: 0.5 }} fontSize="inherit" />}
        />
      </Link>
      <LabelSchool school={schoolData} />
    </Breadcrumbs>
  );
};
