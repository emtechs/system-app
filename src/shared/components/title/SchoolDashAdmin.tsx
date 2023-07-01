import { Breadcrumbs, Chip, Skeleton } from "@mui/material";
import {
  useAppThemeContext,
  useDrawerContext,
  useSchoolContext,
} from "../../contexts";
import { LinkRouter } from "../link";
import { Home, School } from "@mui/icons-material";

export const TitleSchoolDashAdmin = () => {
  const { labelSchoolAdmin, loadingLabelSchool } = useSchoolContext();
  const { handleClickButtonTools } = useDrawerContext();

  return (
    <Breadcrumbs aria-label="breadcrumb">
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

      <Chip
        color="primary"
        variant="filled"
        label={loadingLabelSchool ? <Skeleton width={100} /> : labelSchoolAdmin}
        icon={<School sx={{ mr: 0.5 }} fontSize="inherit" />}
      />
    </Breadcrumbs>
  );
};

interface iTitleSchoolDashAdminPagesProps {
  breadcrumbs: JSX.Element[];
}

export const TitleSchoolDashAdminPages = ({
  breadcrumbs,
}: iTitleSchoolDashAdminPagesProps) => {
  const { mdDown } = useAppThemeContext();
  const { labelSchoolAdmin, loadingLabelSchool } = useSchoolContext();
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
          label={
            loadingLabelSchool ? <Skeleton width={100} /> : labelSchoolAdmin
          }
          icon={<School sx={{ mr: 0.5 }} fontSize="inherit" />}
        />
      </LinkRouter>
      {breadcrumbs}
    </Breadcrumbs>
  );
};
