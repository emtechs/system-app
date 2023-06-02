import { Avatar, CardContent, Typography, useTheme } from "@mui/material";
import { adaptName } from "../../scripts";
import { iSchool } from "../../interfaces";

interface iCardSchoolContentProps {
  school: iSchool;
}

export const CardSchoolContent = ({ school }: iCardSchoolContentProps) => {
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
