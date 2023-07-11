import { Breadcrumbs, Chip, Link } from "@mui/material";
import { Home, School } from "@mui/icons-material";
import { useAppThemeContext } from "../../../contexts";
import { LabelSchool } from "../../label";

export const TitleSchoolRetrievePage = () => {
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
          label={mdDown ? "..." : "Escolas"}
          icon={<School sx={{ mr: 0.5 }} fontSize="inherit" />}
        />
      </Link>
      <LabelSchool />
    </Breadcrumbs>
  );
};
