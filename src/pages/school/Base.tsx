import { Link } from "react-router-dom";
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
          <Link to={"/school/" + id}>
            <Tab icon={<School />} label="Escola" />
          </Link>
          <Link to={"/school/" + id + "/server"}>
            <Tab icon={<People />} label="Servidores" />
          </Link>
          <Tab icon={<Workspaces />} label="Turmas" />
          <Tab icon={<Groups />} label="Alunos" disabled={disabled} />
          <Tab icon={<Checklist />} label="Frequências" disabled={disabled} />
          <Tab icon={<Percent />} label="Infrequência" disabled={disabled} />
        </Tabs>
      </Box>
      {children}
    </>
  );
};
