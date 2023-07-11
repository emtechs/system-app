import { Breadcrumbs, Chip, Link } from "@mui/material";
import { useAppThemeContext } from "../../contexts";
import { Home } from "@mui/icons-material";
import { LabelSchool } from "../label";

export const TitleSchoolDash = () => {
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
      <LabelSchool />
    </Breadcrumbs>
  );
};

interface iTitleSchoolDashPagesProps {
  breadcrumbs: JSX.Element[];
}

export const TitleSchoolDashPages = ({
  breadcrumbs,
}: iTitleSchoolDashPagesProps) => {
  const { mdDown } = useAppThemeContext();

  return (
    <Breadcrumbs maxItems={mdDown ? 2 : undefined} aria-label="breadcrumb">
      <LabelSchool clickable />

      {breadcrumbs}
    </Breadcrumbs>
  );
};
