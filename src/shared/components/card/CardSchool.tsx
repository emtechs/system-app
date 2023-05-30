import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
  useTheme,
} from "@mui/material";
import { useAuthContext } from "../../contexts";
import { adaptName } from "../../scripts";

export const CardSchool = () => {
  const theme = useTheme();
  const { schoolData } = useAuthContext();
  return schoolData ? (
    <Box mx={2} width={theme.spacing(45)} maxWidth="90%">
      <Card>
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            gap: theme.spacing(2),
          }}
        >
          <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
            {schoolData.school.name[0].toUpperCase()}
          </Avatar>
          <Typography
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipses"
          >
            {adaptName(schoolData.school.name)}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  ) : (
    <></>
  );
};
