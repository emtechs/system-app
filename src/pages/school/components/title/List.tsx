import { Breadcrumbs, Chip } from "@mui/material";
import {
  useAppThemeContext,
  useDrawerContext,
} from "../../../../shared/contexts";
import { LinkRouter } from "../../../../shared/components";
import { Home, School } from "@mui/icons-material";

export const TitleListSchool = () => {
  const { mdDown } = useAppThemeContext();
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
      <Chip
        label="Escolas"
        color="primary"
        icon={<School sx={{ mr: 0.5 }} fontSize="inherit" />}
      />
    </Breadcrumbs>
  );
};
