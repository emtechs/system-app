import { Checklist, History, Person, School } from "@mui/icons-material";
import { Box, Tab, Tabs } from "@mui/material";
import { useUserContext } from "../../contexts";
import { iTabsBaseProps } from "../../interfaces";
import { useMemo } from "react";

export const TabsUserRetrievePage = ({
  value,
  handleChange,
}: iTabsBaseProps) => {
  const { userRetrieve } = useUserContext();

  const disabledSchool = useMemo(() => {
    if (userRetrieve?.role === "ADMIN") return true;

    if (userRetrieve?.work_school) return true;

    return false;
  }, [userRetrieve]);

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab icon={<Person />} label="Usuário" value="" />
        <Tab
          icon={<School />}
          label="Escolas"
          disabled={disabledSchool}
          value="school"
        />
        <Tab
          icon={<Checklist />}
          label="Frequências"
          disabled={userRetrieve?.frequencies === 0}
          value="frequency"
        />
        <Tab
          icon={<History />}
          label="Histórico"
          disabled={userRetrieve?.frequencies === 0}
          value="history"
        />
      </Tabs>
    </Box>
  );
};
