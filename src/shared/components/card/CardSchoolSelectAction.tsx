import { Box, Card, CardActionArea, useTheme } from "@mui/material";
import { useSchoolContext } from "../../contexts";
import { CardSchoolContent } from "./CardSchoolContent";

interface iCardSchoolActionProps {
  onClick: () => void;
}

export const CardSchoolSelectAction = ({ onClick }: iCardSchoolActionProps) => {
  const theme = useTheme();
  const { schoolSelect } = useSchoolContext();
  return schoolSelect ? (
    <Box mx={2} width={theme.spacing(45)} maxWidth="90%">
      <Card>
        <CardActionArea onClick={onClick}>
          <CardSchoolContent school={schoolSelect} />
        </CardActionArea>
      </Card>
    </Box>
  ) : (
    <></>
  );
};
