import { Chip, Skeleton } from "@mui/material";
import { useAppThemeContext, useUserContext } from "../../contexts";
import { iLabelBaseProps } from "../../interfaces";
import { Person } from "@mui/icons-material";
import { adaptName } from "../../scripts";

export const LabelUser = ({ clickable }: iLabelBaseProps) => {
  const { mdDown,loading } = useAppThemeContext();
  const { userSelect } = useUserContext();

  return (
    <Chip
      clickable={clickable}
      color="primary"
      variant={clickable ? "outlined" : undefined}
      label={
        loading ? (
          <Skeleton width={100} />
        ) : mdDown ? (
          adaptName(userSelect?.label)
        ) : (
          userSelect?.label
        )
      }
      icon={<Person sx={{ mr: 0.5 }} fontSize="inherit" />}
    />
  );
};
