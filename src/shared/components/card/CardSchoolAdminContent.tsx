import { Avatar, CardContent, Typography, useTheme } from "@mui/material";
import { adaptName } from "../../scripts";
import { iSchoolClass } from "../../interfaces";

interface iCardSchoolAdminContentProps {
  school: iSchoolClass;
}

export const CardSchoolAdminContent = ({
  school,
}: iCardSchoolAdminContentProps) => {
  const theme = useTheme();
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
