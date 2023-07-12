import { Chip, Skeleton } from "@mui/material";
import { useAppThemeContext, useClassContext } from "../../contexts";
import { iLabelBaseProps } from "../../interfaces";
import { Workspaces } from "@mui/icons-material";
import { adaptNameSchool } from "../../scripts";

export const LabelClass = ({ clickable }: iLabelBaseProps) => {
  const { mdDown, loading } = useAppThemeContext();
  const { classSelect } = useClassContext();

  return (
    <Chip
      clickable={clickable}
      color="primary"
      variant={clickable ? "outlined" : undefined}
      label={
        loading ? (
          <Skeleton width={100} />
        ) : mdDown ? (
          adaptNameSchool(classSelect?.label, 15)
        ) : (
          classSelect?.label
        )
      }
      icon={<Workspaces sx={{ mr: 0.5 }} fontSize="inherit" />}
    />
  );
};
