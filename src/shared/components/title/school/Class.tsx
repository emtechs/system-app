import { Breadcrumbs, Chip, Link } from "@mui/material";
import { Home } from "@mui/icons-material";
import { useAppThemeContext } from "../../../contexts";
import { LabelClass, LabelSchool } from "../../label";

export const TitleSchoolClassPage = () => {
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
      <LabelSchool clickable />
      <LabelClass />
    </Breadcrumbs>
  );
};
