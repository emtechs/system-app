import { Avatar, CardContent, Typography, useTheme } from "@mui/material";
import { adaptName } from "../../scripts";
import { iClass } from "../../interfaces";

interface iCardSchoolClassContentProps {
  classData: iClass;
}

export const CardSchoolClassContent = ({
  classData,
}: iCardSchoolClassContentProps) => {
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
        {classData.name[0].toUpperCase()}
      </Avatar>
      <Typography overflow="hidden" whiteSpace="nowrap" textOverflow="ellipses">
        {adaptName(classData.name)}
      </Typography>
    </CardContent>
  );
};
