import { Avatar, CardContent, Typography } from "@mui/material";
import { iSchoolClass } from "../../interfaces";
import { useAppThemeContext } from "../../contexts";
import { adaptName } from "../../scripts";

interface iCardSchoolAdminContentProps {
  school: iSchoolClass;
}

export const CardSchoolAdminContent = ({
  school,
}: iCardSchoolAdminContentProps) => {
  const { theme } = useAppThemeContext();
  return (
    <CardContent
      sx={{
        display: "flex",
        alignItems: "center",
        gap: theme.spacing(2),
      }}
    >
      <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
        {school.name[0].toUpperCase()}
      </Avatar>
      <Typography overflow="hidden" whiteSpace="nowrap" textOverflow="ellipses">
        {adaptName(school.name)}
      </Typography>
    </CardContent>
  );
};
