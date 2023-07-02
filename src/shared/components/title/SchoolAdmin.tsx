import { Breadcrumbs, Chip } from "@mui/material";
import {
  useAppThemeContext,
  useAuthContext,
  useDrawerContext,
} from "../../contexts";
import { LinkRouter } from "../link";
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
      <LinkRouter
        underline="none"
        color="inherit"
        to="/"
        onClick={handleClickButtonTools}
      >
        <Chip
          clickable
          color="primary"
          variant="outlined"
          label="Página Inicial"
          icon={<Home sx={{ mr: 0.5 }} fontSize="inherit" />}
        />
      </LinkRouter>
      <LinkRouter underline="none" color="inherit" to="/school">
        <Chip
          clickable
          color="primary"
          variant="outlined"
          label="Escolas"
          icon={<School sx={{ mr: 0.5 }} fontSize="inherit" />}
        />
      </LinkRouter>
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
      <LinkRouter
        underline="none"
        color="inherit"
        to="/"
        onClick={handleClickButtonTools}
      >
        <Chip
          clickable
          color="primary"
          variant="outlined"
          label="Página Inicial"
          icon={<Home sx={{ mr: 0.5 }} fontSize="inherit" />}
        />
      </LinkRouter>
      <LinkRouter underline="none" color="inherit" to="/school">
        <Chip
          clickable
          color="primary"
          variant="outlined"
          label="Escolas"
          icon={<School sx={{ mr: 0.5 }} fontSize="inherit" />}
        />
      </LinkRouter>

      <LinkRouter
        underline="none"
        color="inherit"
        to={"/school?id=" + schoolData?.id}
      >
        <LabelSchool clickable />
      </LinkRouter>

      {breadcrumbs}
    </Breadcrumbs>
  );
};
