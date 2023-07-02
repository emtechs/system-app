import { Breadcrumbs, Chip } from "@mui/material";
import { Home } from "@mui/icons-material";
import {
  useAppThemeContext,
  useAuthContext,
  useDrawerContext,
} from "../../../../shared/contexts";
import {
  LabelSchool,
  LabelUser,
  LinkRouter,
} from "../../../../shared/components";

export const TitleServerSchool = () => {
  const { mdDown } = useAppThemeContext();
  const { schoolData, userSelect } = useAuthContext();
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
        <LabelSchool clickable school={schoolData} />
      </LinkRouter>
      <LabelUser user={userSelect} />
    </Breadcrumbs>
  );
};
