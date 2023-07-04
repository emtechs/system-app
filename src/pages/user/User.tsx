import { Breadcrumbs, Chip, Link } from "@mui/material";
import { LayoutBasePage } from "../../shared/layouts";
import { Home, People } from "@mui/icons-material";
import { ToolsUser } from "../../shared/components";
import { ViewUser } from "./view";
import { useCallback, useMemo } from "react";
import { usePaginationContext, useUserContext } from "../../shared/contexts";
import { useSearchParams } from "react-router-dom";

export const UserPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { setSearch } = useUserContext();
  const { setActive } = usePaginationContext();

  const role = useMemo(() => {
    return searchParams.get("role") || "";
  }, [searchParams]);

  const handleRole = useCallback((texto: string) => {
    setSearchParams({ role: texto }, { replace: true });
  }, []);

  const onClickReset = useCallback(() => {
    setActive(true);
    setSearch(undefined);
    setSearchParams({ role: "" }, { replace: true });
  }, []);

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
      tools={
        <ToolsUser
          isHome
          isUser
          isActive
          isSearch
          isRole
          role={role}
          handleRole={handleRole}
          onClickReset={onClickReset}
        />
      }
    >
      <ViewUser role={role} />
    </LayoutBasePage>
  );
};
