import { Box, Card, CardActionArea, useTheme } from "@mui/material";
import { useAuthContext } from "../../contexts";
import { CardSchoolAdminContent } from "./CardSchoolAdminContent";

interface iCardSchoolActionProps {
  onClick: () => void;
}

export const CardSchoolAdminAction = ({ onClick }: iCardSchoolActionProps) => {
  const theme = useTheme();
  const { schoolDataAdmin } = useAuthContext();
  return schoolDataAdmin ? (
    <Box mx={2} width={theme.spacing(45)} maxWidth="90%">
      <Card>
        <CardActionArea onClick={onClick}>
          <CardSchoolAdminContent school={schoolDataAdmin} />
        </CardActionArea>
      </Card>
    </Box>
  ) : (
    <></>
  );
};
