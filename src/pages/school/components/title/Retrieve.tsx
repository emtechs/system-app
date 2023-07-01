import { Breadcrumbs, Chip, Skeleton } from "@mui/material";
import { Home, School } from "@mui/icons-material";
import {
  useAppThemeContext,
  useDrawerContext,
  useSchoolContext,
} from "../../../../shared/contexts";
import { LinkRouter } from "../../../../shared/components";

export const TitleRetrieveSchool = () => {
  const { mdDown } = useAppThemeContext();
  const { labelSchool, loadingLabelSchool } = useSchoolContext();
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
      <LinkRouter underline="none" color="inherit" to="/school">
        <Chip
          clickable
          color="primary"
          variant="outlined"
          label={mdDown ? "..." : "Escolas"}
          icon={<School sx={{ mr: 0.5 }} fontSize="inherit" />}
        />
      </LinkRouter>
      <Chip
        label={loadingLabelSchool ? <Skeleton width={100} /> : labelSchool}
        color="primary"
        icon={<School sx={{ mr: 0.5 }} fontSize="inherit" />}
      />
    </Breadcrumbs>
  );
};
