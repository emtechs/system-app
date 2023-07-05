import { Chip, Skeleton } from "@mui/material";
import { useAppThemeContext, useSchoolContext } from "../../contexts";
import { iSchool } from "../../interfaces";
import { School } from "@mui/icons-material";
import { adaptNameSchool } from "../../scripts";

interface iLabelSchoolProps {
  school?: iSchool;
  clickable?: boolean;
}

export const LabelSchool = ({ school, clickable }: iLabelSchoolProps) => {
  const { mdDown } = useAppThemeContext();
  const { loadingSchool } = useSchoolContext();

  return (
    <Chip
      clickable={clickable}
      color="primary"
      variant={clickable ? "outlined" : undefined}
      label={
        loadingSchool ? (
          <Skeleton width={100} />
        ) : mdDown ? (
          adaptNameSchool(school?.name, 15)
        ) : (
          school?.name
        )
      }
      icon={<School sx={{ mr: 0.5 }} fontSize="inherit" />}
    />
  );
};
