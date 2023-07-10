import { Breadcrumbs, Chip, Link } from "@mui/material";
import { useAppThemeContext, useUserContext } from "../../contexts";
import { Home, People } from "@mui/icons-material";
import { LabelUser } from "../label";

export const TitleUserRetrievePage = () => {
  const { mdDown } = useAppThemeContext();
  const { userRetrieve } = useUserContext();
  return (
    <Breadcrumbs maxItems={mdDown ? 2 : undefined} aria-label="breadcrumb">
      <Link underline="none" color="inherit" href="/">
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
      <LabelUser user={userRetrieve} />
    </Breadcrumbs>
  );
};
