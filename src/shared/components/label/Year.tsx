import { Chip, Skeleton } from "@mui/material";
import { useAppThemeContext, useCalendarContext } from "../../contexts";
import { iLabelBaseProps } from "../../interfaces";
import { Today } from "@mui/icons-material";
import { adaptNameSchool } from "../../scripts";

export const LabelYear = ({ clickable }: iLabelBaseProps) => {
  const { mdDown, loading } = useAppThemeContext();
  const { yearSelect } = useCalendarContext();

  return (
    <Chip
      clickable={clickable}
      color="primary"
      variant={clickable ? "outlined" : undefined}
      label={
        loading ? (
          <Skeleton width={100} />
        ) : mdDown ? (
          adaptNameSchool(yearSelect?.label, 15)
        ) : (
          yearSelect?.label
        )
      }
      icon={<Today sx={{ mr: 0.5 }} fontSize="inherit" />}
    />
  );
};
