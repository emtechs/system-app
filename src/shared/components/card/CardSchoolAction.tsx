import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  useTheme,
} from "@mui/material";
import { useAuthContext } from "../../contexts";
import { adaptName } from "../../scripts";

interface iCardSchoolActionProps {
  onClick: () => void;
}

export const CardSchoolAction = ({ onClick }: iCardSchoolActionProps) => {
  const theme = useTheme();
  const { schoolData } = useAuthContext();
  return schoolData ? (
    <Box mx={2} width={theme.spacing(45)} maxWidth="90%">
      <Card>
        <CardActionArea onClick={onClick}>
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
        </CardActionArea>
      </Card>
    </Box>
  ) : (
    <></>
  );
};
