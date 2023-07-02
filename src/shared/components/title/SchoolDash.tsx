import { Breadcrumbs, Chip } from "@mui/material";
import {
  useAppThemeContext,
  useAuthContext,
  useDrawerContext,
} from "../../contexts";
import { LinkRouter } from "../link";
import { Home } from "@mui/icons-material";
import { LabelSchool } from "../label";

export const TitleSchoolDash = () => {
  const { schoolData, setSchoolData } = useAuthContext();

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
      <LinkRouter
        underline="none"
        color="inherit"
        to="/"
        onClick={handleClickButtonTools}
      >
        <LabelSchool clickable school={schoolData} />
      </LinkRouter>
      {breadcrumbs}
    </Breadcrumbs>
  );
};
