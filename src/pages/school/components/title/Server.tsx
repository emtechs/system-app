import { Breadcrumbs, Chip, Link } from "@mui/material";
import { Home } from "@mui/icons-material";
import {
  useAppThemeContext,
  useAuthContext,
  useDrawerContext,
} from "../../../../shared/contexts";
import { LabelSchool, LabelUser } from "../../../../shared/components";

export const TitleServerSchool = () => {
  const { mdDown } = useAppThemeContext();
  const { schoolData, userSelect } = useAuthContext();
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
      <Link underline="none" color="inherit" href={"/school/" + schoolData?.id}>
        <LabelSchool clickable school={schoolData} />
      </Link>
      <LabelUser user={userSelect} />
    </Breadcrumbs>
  );
};
