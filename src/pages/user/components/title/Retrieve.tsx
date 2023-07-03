import { Breadcrumbs, Chip, Link } from "@mui/material";
import {
  useAppThemeContext,
  useAuthContext,
  useDrawerContext,
} from "../../../../shared/contexts";
import { LabelUser } from "../../../../shared/components";
import { Home, People } from "@mui/icons-material";

export const TitleRetrieveUser = () => {
  const { mdDown } = useAppThemeContext();
  const { userSelect } = useAuthContext();
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
          label={mdDown ? "..." : "Página Inicial"}
          icon={<Home sx={{ mr: 0.5 }} fontSize="inherit" />}
        />
      </Link>
      <Link underline="none" color="inherit" href="/user">
        <Chip
          clickable
          color="primary"
          variant="outlined"
          label={mdDown ? "..." : "Usuários"}
          icon={<People sx={{ mr: 0.5 }} fontSize="inherit" />}
        />
      </Link>
      <LabelUser user={userSelect} />
    </Breadcrumbs>
  );
};
