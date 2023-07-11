import { Breadcrumbs, Chip, Link } from "@mui/material";
import { Home } from "@mui/icons-material";
import { useAppThemeContext } from "../../../contexts";
import { LabelSchool, LabelUser } from "../../label";

export const TitleSchoolUserPage = () => {
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
      <LabelUser />
    </Breadcrumbs>
  );
};
