import { Breadcrumbs, Chip, Link } from "@mui/material";
import { Home } from "@mui/icons-material";
import {
  useAppThemeContext,
  useSchoolContext,
  useUserContext,
} from "../../../contexts";
import { LabelSchool, LabelUser } from "../../label";

export const TitleSchoolUserPage = () => {
  const { mdDown } = useAppThemeContext();
  const { schoolRetrieve } = useSchoolContext();
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
      <Link
        underline="none"
        color="inherit"
        href={"/school/" + schoolRetrieve?.id}
      >
        <LabelSchool clickable school={schoolRetrieve} />
      </Link>
      <LabelUser user={userRetrieve} />
    </Breadcrumbs>
  );
};
