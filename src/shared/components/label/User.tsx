import { Chip, Skeleton } from "@mui/material";
import { useAppThemeContext, useUserContext } from "../../contexts";
import { iUser } from "../../interfaces";
import { Person } from "@mui/icons-material";
import { adaptNameUserLabel } from "../../scripts";

interface iLabelUserProps {
  user?: iUser;
  clickable?: boolean;
}

export const LabelUser = ({ user, clickable }: iLabelUserProps) => {
  const { mdDown } = useAppThemeContext();
  const { loadingUser } = useUserContext();

  return (
    <Chip
      clickable={clickable}
      color="primary"
      variant={clickable ? "outlined" : undefined}
      label={
        loadingUser ? (
          <Skeleton width={100} />
        ) : mdDown ? (
          adaptNameUserLabel(user?.name)
        ) : (
          user?.name
        )
      }
      icon={<Person sx={{ mr: 0.5 }} fontSize="inherit" />}
    />
  );
};
