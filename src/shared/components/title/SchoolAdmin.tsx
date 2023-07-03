import { Breadcrumbs, Chip, Link } from "@mui/material";
import {
  useAppThemeContext,
  useAuthContext,
  useDrawerContext,
} from "../../contexts";
import { Home, School } from "@mui/icons-material";
import { LabelSchool } from "../label";

interface iTitleSchoolAdminPagesProps {
  breadcrumbs: JSX.Element[];
}

export const TitleSchoolAdminPages = ({
  breadcrumbs,
}: iTitleSchoolAdminPagesProps) => {
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
      <Link underline="none" color="inherit" href="/school">
        <Chip
          clickable
          color="primary"
          variant="outlined"
          label="Escolas"
          icon={<School sx={{ mr: 0.5 }} fontSize="inherit" />}
        />
      </Link>
      {breadcrumbs}
    </Breadcrumbs>
  );
};

export const TitleRetrieveSchoolAdminPages = ({
  breadcrumbs,
}: iTitleSchoolAdminPagesProps) => {
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
          label="Página Inicial"
          icon={<Home sx={{ mr: 0.5 }} fontSize="inherit" />}
        />
      </Link>
      <Link underline="none" color="inherit" href="/school">
        <Chip
          clickable
          color="primary"
          variant="outlined"
          label="Escolas"
          icon={<School sx={{ mr: 0.5 }} fontSize="inherit" />}
        />
      </Link>

      <Link
        underline="none"
        color="inherit"
        href={"/school?id=" + schoolData?.id}
      >
        <LabelSchool clickable />
      </Link>

      {breadcrumbs}
    </Breadcrumbs>
  );
};
