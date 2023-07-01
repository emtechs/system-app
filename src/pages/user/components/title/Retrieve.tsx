import { Breadcrumbs, Chip, Skeleton } from "@mui/material";
import {
  useAppThemeContext,
  useDrawerContext,
  useUserContext,
} from "../../../../shared/contexts";
import { LinkRouter } from "../../../../shared/components";
import { Home, People, Person } from "@mui/icons-material";

export const TitleRetrieveUser = () => {
  const { mdDown } = useAppThemeContext();
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
      <LinkRouter underline="none" color="inherit" to="/user">
        <Chip
          clickable
          color="primary"
          variant="outlined"
          label={mdDown ? "..." : "Usuários"}
          icon={<People sx={{ mr: 0.5 }} fontSize="inherit" />}
        />
      </LinkRouter>
      <Chip
        label={loadingLabelUser ? <Skeleton width={100} /> : labelUser}
        color="primary"
        icon={<Person sx={{ mr: 0.5 }} fontSize="inherit" />}
      />
    </Breadcrumbs>
  );
};
