import { Breadcrumbs, Chip, Link } from "@mui/material";
import { History, Home } from "@mui/icons-material";
import { useAppThemeContext } from "../../../../contexts";
import { LabelUser } from "../../../label";

export const TitleUserViewHistoryPage = () => {
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
        label="Histórico"
        icon={<History sx={{ mr: 0.5 }} fontSize="inherit" />}
      />
    </Breadcrumbs>
  );
};
