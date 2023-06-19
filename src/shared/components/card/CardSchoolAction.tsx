import { Box, Card, CardActionArea, useTheme } from "@mui/material";
import { useAuthContext } from "../../contexts";
import { CardSchoolContent } from "./CardSchoolContent";

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
          <CardSchoolContent school={schoolData} />
        </CardActionArea>
      </Card>
    </Box>
  ) : (
    <></>
  );
};
