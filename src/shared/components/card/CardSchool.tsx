import { Box, Card } from "@mui/material";
import { useAppThemeContext } from "../../contexts";
import { CardSchoolContent } from "./CardSchoolContent";
import { iSchool } from "../../interfaces";

interface iCardSchoolProps {
  school: iSchool;
}

export const CardSchool = ({ school }: iCardSchoolProps) => {
  const { theme } = useAppThemeContext();

  return (
    <Box mx={2} width={theme.spacing(45)} maxWidth="90%">
      <Card>
        <CardSchoolContent school={school} />
      </Card>
    </Box>
  );
};
