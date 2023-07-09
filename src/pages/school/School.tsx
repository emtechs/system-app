import { Breadcrumbs, Chip, Link } from "@mui/material";
import { Home, School } from "@mui/icons-material";
import { ToolsSchool } from "../../shared/components";
import { LayoutBasePage } from "../../shared/layouts";
import { ViewSchool } from "../../shared/views";
import { useSchoolContext } from "../../shared/contexts";

export const SchoolPage = () => {
  const { is_director, search } = useSchoolContext();
  return (
    <LayoutBasePage
      title={
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="none" color="inherit" href="/">
            <Chip
              clickable
              color="primary"
              variant="outlined"
              label="Página Inicial"
              icon={<Home sx={{ mr: 0.5 }} fontSize="inherit" />}
            />
          </Link>
          <Chip
            label="Escolas"
            color="primary"
            icon={<School sx={{ mr: 0.5 }} fontSize="inherit" />}
          />
        </Breadcrumbs>
      }
      tools={
        <ToolsSchool
          isHome
          isSearch
          isDirector
          isActive
          isNew
          titleNew="Nova"
          isReset
        />
      }
    >
      <ViewSchool is_director={is_director} search={search} />
    </LayoutBasePage>
  );
};
