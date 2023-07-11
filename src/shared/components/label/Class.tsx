import { Chip, Skeleton } from "@mui/material";
import { useAppThemeContext, useClassContext } from "../../contexts";
import { iLabelBaseProps } from "../../interfaces";
import { Workspaces } from "@mui/icons-material";
import { adaptNameSchool } from "../../scripts";

export const LabelClass = ({ clickable }: iLabelBaseProps) => {
  const { mdDown } = useAppThemeContext();
  const { loadingClass, classRetrieve } = useClassContext();

  return (
    <Chip
      clickable={clickable}
      color="primary"
      variant={clickable ? "outlined" : undefined}
      label={
        loadingClass ? (
          <Skeleton width={100} />
        ) : mdDown ? (
          adaptNameSchool(classRetrieve?.name, 15)
        ) : (
          classRetrieve?.name
        )
      }
      icon={<Workspaces sx={{ mr: 0.5 }} fontSize="inherit" />}
    />
  );
};
