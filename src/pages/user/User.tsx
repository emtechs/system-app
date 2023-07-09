import { Breadcrumbs, Chip, Link } from "@mui/material";
import { LayoutBasePage } from "../../shared/layouts";
import { Home, People } from "@mui/icons-material";
import { ToolsUser } from "../../shared/components";
import { useEffect } from "react";
import { useUserContext } from "../../shared/contexts";
import { useSearchParams } from "react-router-dom";
import { ViewUser } from "../../shared/views";

export const UserPage = () => {
  const [searchParams] = useSearchParams();
  const roleData = searchParams.get("role");
  const { search, setRole } = useUserContext();

  useEffect(() => {
    if (roleData) setRole(roleData);
  }, [roleData]);

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
            label="Usuários"
            color="primary"
            icon={<People sx={{ mr: 0.5 }} fontSize="inherit" />}
          />
        </Breadcrumbs>
      }
      tools={<ToolsUser isHome isUser isActive isSearch isRole isReset />}
    >
      <ViewUser search={search} />
    </LayoutBasePage>
  );
};
