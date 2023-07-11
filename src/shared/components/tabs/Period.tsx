import { Box, Tab, Tabs } from "@mui/material";
import { iTabsBaseProps } from "../../interfaces";
import { useAuthContext } from "../../contexts";

export const TabsPeriod = ({ value, handleChange }: iTabsBaseProps) => {
  const { periods } = useAuthContext();

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
      >
        {periods?.map((el) => (
          <Tab key={el.id} label={el.label} value={el.id} />
        ))}
      </Tabs>
    </Box>
  );
};
