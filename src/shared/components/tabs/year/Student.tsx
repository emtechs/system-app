import { Box, Tab, Tabs } from "@mui/material";
import { useAuthContext } from "../../../contexts";

export const TabsStudentYearPage = () => {
  const { listYear } = useAuthContext();

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs value={0} variant="scrollable" scrollButtons="auto">
        <Tab label="Alunos" />
        {listYear?.map((el) => (
          <Tab
            key={el.id}
            label={el.year}
            href={`/year/${el.id}?view=student`}
          />
        ))}
      </Tabs>
    </Box>
  );
};
