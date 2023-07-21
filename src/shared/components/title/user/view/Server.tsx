import { Breadcrumbs, Chip, Link } from "@mui/material";
import { Home, School } from "@mui/icons-material";
import { useAppThemeContext } from "../../../../contexts";
import { LabelUser } from "../../../label";

export const TitleUserViewSchoolPage = () => {
  const { mdDown } = useAppThemeContext();
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
      <LabelUser clickable />
      <Chip
        color="primary"
        label="Escolas"
        icon={<School sx={{ mr: 0.5 }} fontSize="inherit" />}
      />
    </Breadcrumbs>
  );
};
