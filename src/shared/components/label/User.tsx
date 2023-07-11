import { Chip, Skeleton } from "@mui/material";
import { useAppThemeContext, useUserContext } from "../../contexts";
import { iLabelBaseProps } from "../../interfaces";
import { Person } from "@mui/icons-material";
import { adaptName } from "../../scripts";

export const LabelUser = ({ clickable }: iLabelBaseProps) => {
  const { mdDown } = useAppThemeContext();
  const { loadingUser, userRetrieve } = useUserContext();

  return (
    <Chip
      clickable={clickable}
      color="primary"
      variant={clickable ? "outlined" : undefined}
      label={
        loadingUser ? (
          <Skeleton width={100} />
        ) : mdDown ? (
          adaptName(userRetrieve?.name)
        ) : (
          userRetrieve?.name
        )
      }
      icon={<Person sx={{ mr: 0.5 }} fontSize="inherit" />}
    />
  );
};
