import { Box, Tab, Tabs } from "@mui/material";
import {
  Checklist,
  Groups,
  People,
  Percent,
  School,
  Workspaces,
} from "@mui/icons-material";
import { iChildren } from "../../shared/interfaces";
import { useSchoolContext } from "../../shared/contexts";

interface iBaseRetrieveSchoolPageProps extends iChildren {
  id: string;
}

export const BaseRetrieveSchoolPage = ({
  children,
  id,
}: iBaseRetrieveSchoolPageProps) => {
  const { disabled, defineValue } = useSchoolContext();

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={defineValue()} variant="scrollable" scrollButtons="auto">
          <Tab href={"/school/" + id} icon={<School />} label="Escola" />
          <Tab
            href={"/school/" + id + "/server"}
            icon={<People />}
            label="Servidores"
          />
          <Tab href="" icon={<Workspaces />} label="Turmas" />
          <Tab href="" icon={<Groups />} label="Alunos" disabled={disabled} />
          <Tab
            href=""
            icon={<Checklist />}
            label="Frequências"
            disabled={disabled}
          />
          <Tab
            href=""
            icon={<Percent />}
            label="Infrequência"
            disabled={disabled}
          />
        </Tabs>
      </Box>
      {children}
    </>
  );
};
