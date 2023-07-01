import { Breadcrumbs, Chip, Skeleton } from "@mui/material";
import { Home, Person, School } from "@mui/icons-material";
import {
  useAppThemeContext,
  useAuthContext,
  useDrawerContext,
  useSchoolContext,
  useUserContext,
} from "../../../../shared/contexts";
import { LinkRouter } from "../../../../shared/components";

export const TitleServerSchool = () => {
  const { mdDown } = useAppThemeContext();
  const { schoolData } = useAuthContext();
  const { labelSchool, loadingLabelSchool } = useSchoolContext();
  const { labelUser, loadingLabelUser } = useUserContext();
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
          label={mdDown ? "..." : "Página Inicial"}
          icon={<Home sx={{ mr: 0.5 }} fontSize="inherit" />}
        />
      </LinkRouter>
      <LinkRouter
        underline="none"
        color="inherit"
        to={"/school/" + schoolData?.id}
      >
        <Chip
          clickable
          color="primary"
          variant="outlined"
          label={loadingLabelSchool ? <Skeleton width={100} /> : labelSchool}
          icon={<School sx={{ mr: 0.5 }} fontSize="inherit" />}
        />
      </LinkRouter>
      <Chip
        label={loadingLabelUser ? <Skeleton width={100} /> : labelUser}
        color={"primary"}
        icon={<Person sx={{ mr: 0.5 }} fontSize="inherit" />}
      />
    </Breadcrumbs>
  );
};
