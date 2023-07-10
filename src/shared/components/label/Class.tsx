import { Chip, Skeleton } from "@mui/material";
import { useAppThemeContext, useClassContext } from "../../contexts";
import { iClass } from "../../interfaces";
import { Workspaces } from "@mui/icons-material";
import { adaptNameSchool } from "../../scripts";

interface iLabelClassProps {
  classData?: iClass;
  clickable?: boolean;
}

export const LabelClass = ({ classData, clickable }: iLabelClassProps) => {
  const { mdDown } = useAppThemeContext();
  const { loadingClass } = useClassContext();

  return (
    <Chip
      clickable={clickable}
      color="primary"
      variant={clickable ? "outlined" : undefined}
      label={
        loadingClass ? (
          <Skeleton width={100} />
        ) : mdDown ? (
          adaptNameSchool(classData?.name, 15)
        ) : (
          classData?.name
        )
      }
      icon={<Workspaces sx={{ mr: 0.5 }} fontSize="inherit" />}
    />
  );
};
