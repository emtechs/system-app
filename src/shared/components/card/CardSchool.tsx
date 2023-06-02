import { Box, Card, useTheme } from "@mui/material";
import { useAuthContext } from "../../contexts";
import { CardSchoolContent } from "./CardSchoolContent";

export const CardSchool = () => {
  const theme = useTheme();
  const { schoolData } = useAuthContext();
  return schoolData ? (
    <Box mx={2} width={theme.spacing(45)} maxWidth="90%">
      <Card>
        <CardSchoolContent school={schoolData.school} />
      </Card>
    </Box>
  ) : (
    <></>
  );
};
