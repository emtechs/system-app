import {
  Checklist,
  Groups,
  People,
  Percent,
  School,
  Workspaces,
} from "@mui/icons-material";
import { Box, Tab, Tabs } from "@mui/material";
import { useSchoolContext } from "../../contexts";
import { iTabsBaseProps } from "../../interfaces";

export const TabsSchoolRetrievePage = ({
  value,
  handleChange,
}: iTabsBaseProps) => {
  const { schoolRetrieve } = useSchoolContext();

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab icon={<School />} label="Escola" value="" />
        <Tab icon={<People />} label="Servidores" value="server" />
        <Tab icon={<Workspaces />} label="Turmas" value="class" />
        <Tab
          icon={<Groups />}
          label="Alunos"
          disabled={schoolRetrieve?.is_dash ? false : true}
          value="student"
        />
        <Tab
          icon={<Checklist />}
          label="Frequências"
          disabled={schoolRetrieve?.is_dash ? false : true}
          value="frequency"
        />
        <Tab
          icon={<Percent />}
          label="Infrequência"
          disabled={schoolRetrieve?.frequencies === 0}
          value="infrequency"
        />
      </Tabs>
    </Box>
  );
};
