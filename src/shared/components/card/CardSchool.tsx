import { Box, Card, useTheme } from "@mui/material";
import { useSchoolContext } from "../../contexts";
import { CardSchoolContent } from "./CardSchoolContent";

export const CardSchool = () => {
  const theme = useTheme();
  const { schoolSelect } = useSchoolContext();
  return schoolSelect ? (
    <Box mx={2} width={theme.spacing(45)} maxWidth="90%">
      <Card>
        <CardSchoolContent school={schoolSelect} />
      </Card>
    </Box>
  ) : (
    <></>
  );
};
