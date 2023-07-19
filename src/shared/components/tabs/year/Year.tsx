import { Tab, Tabs } from "@mui/material";
import { useAuthContext } from "../../../contexts";
import { iTabsBaseProps } from "../../../interfaces";

export const TabsYear = ({ value, handleChange }: iTabsBaseProps) => {
  const { listYear } = useAuthContext();

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      orientation="vertical"
      variant="scrollable"
      sx={{ borderRight: 1, borderColor: "divider" }}
    >
      {listYear.map((el, index) => (
        <Tab key={el.id} label={el.year} value={index} />
      ))}
    </Tabs>
  );
};
