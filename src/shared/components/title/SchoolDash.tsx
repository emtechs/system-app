import { Breadcrumbs, Chip, Link } from "@mui/material";
import {
  useAppThemeContext,
  useAuthContext,
  useDrawerContext,
} from "../../contexts";
import { Home } from "@mui/icons-material";
import { LabelSchool } from "../label";

export const TitleSchoolDash = () => {
  const { schoolData, setSchoolData } = useAuthContext();

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link
        underline="none"
        color="inherit"
        href="/"
        onClick={() => {
          setSchoolData(undefined);
        }}
      >
        <Chip
          clickable
          color="primary"
          variant="outlined"
          label="Página Inicial"
          icon={<Home sx={{ mr: 0.5 }} fontSize="inherit" />}
        />
      </Link>
      <LabelSchool school={schoolData} />
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
        <LabelSchool clickable school={schoolData} />
      </Link>
      {breadcrumbs}
    </Breadcrumbs>
  );
};
