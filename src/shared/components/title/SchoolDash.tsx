import { Breadcrumbs, Chip } from "@mui/material";
import {
  useAppThemeContext,
  useAuthContext,
  useDrawerContext,
  useSchoolContext,
} from "../../contexts";
import { LinkRouter } from "../link";
import { Home, School } from "@mui/icons-material";

export const TitleSchoolDash = () => {
  const { schoolData, setSchoolData } = useAuthContext();
  const { labelSchool } = useSchoolContext();

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <LinkRouter
        underline="none"
        color="inherit"
        to="/"
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
      </LinkRouter>
      {schoolData && (
        <Chip
          label={labelSchool()}
          color="primary"
          icon={<School sx={{ mr: 0.5 }} fontSize="inherit" />}
        />
      )}
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
  const { labelSchool } = useSchoolContext();
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
          label={labelSchool()}
          icon={<School sx={{ mr: 0.5 }} fontSize="inherit" />}
        />
      </LinkRouter>
      {breadcrumbs}
    </Breadcrumbs>
  );
};
