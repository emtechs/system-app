import { Chip, Link, Skeleton } from "@mui/material";
import { useAppThemeContext, useSchoolContext } from "../../contexts";
import { iLabelBaseProps } from "../../interfaces";
import { School } from "@mui/icons-material";
import { adaptNameSchool } from "../../scripts";
import { useMemo } from "react";

export const LabelSchool = ({ clickable }: iLabelBaseProps) => {
  const { mdDown } = useAppThemeContext();
  const { loadingSchool, schoolRetrieve } = useSchoolContext();

  const label = useMemo(() => {
    if (loadingSchool) return <Skeleton width={100} />;
    if (mdDown) return adaptNameSchool(schoolRetrieve?.name, 15);
    return schoolRetrieve?.name;
  }, [loadingSchool, mdDown, schoolRetrieve]);

  return clickable ? (
    <Link
      underline="none"
      color="inherit"
      href={"/school?id=" + schoolRetrieve?.id}
    >
      <Chip
        clickable
        color="primary"
        variant={"outlined"}
        label={label}
        icon={<School sx={{ mr: 0.5 }} fontSize="inherit" />}
      />
    </Link>
  ) : (
    <Chip
      color="primary"
      label={label}
      icon={<School sx={{ mr: 0.5 }} fontSize="inherit" />}
    />
  );
};
