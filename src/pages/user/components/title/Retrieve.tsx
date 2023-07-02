import { Breadcrumbs, Chip } from "@mui/material";
import {
  useAppThemeContext,
  useAuthContext,
  useDrawerContext,
} from "../../../../shared/contexts";
import { LabelUser, LinkRouter } from "../../../../shared/components";
import { Home, People } from "@mui/icons-material";

export const TitleRetrieveUser = () => {
  const { mdDown } = useAppThemeContext();
  const { userSelect } = useAuthContext();
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
      <LabelUser user={userSelect} />
    </Breadcrumbs>
  );
};
