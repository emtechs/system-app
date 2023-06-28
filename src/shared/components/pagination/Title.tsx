import { Breadcrumbs, Chip } from "@mui/material";
import {
  useAppThemeContext,
  useAuthContext,
  useDrawerContext,
} from "../../contexts";
import { iChildren } from "../../interfaces";
import { LinkRouter } from "../link";
import { Home, School } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { useCallback } from "react";
import { adaptName } from "../../scripts";

export const Title = ({ children }: iChildren) => {
  const { mdDown } = useAppThemeContext();
  const { schoolData, setSchoolData } = useAuthContext();
  const { handleClickButtonTools } = useDrawerContext();
  const location = useLocation();

  const label = useCallback(() => {
    if (schoolData) {
      if (mdDown) return adaptName(schoolData.name);
      return schoolData.name;
    }
    return "";
  }, [schoolData, mdDown]);

  return location.pathname === "/" ? (
    <Breadcrumbs aria-label="breadcrumb">
      <LinkRouter
        underline="none"
        color="inherit"
        to="/"
        onClick={() => {
          setSchoolData(undefined);
        }}
      >
        <Chip
          clickable
          color="primary"
          variant="outlined"
          label="Página Inicial"
          icon={<Home sx={{ mr: 0.5 }} fontSize="inherit" />}
        />
      </LinkRouter>
      {schoolData && (
        <Chip
          label={label()}
          color="primary"
          icon={<School sx={{ mr: 0.5 }} fontSize="inherit" />}
        />
      )}
    </Breadcrumbs>
  ) : (
    <Breadcrumbs maxItems={mdDown ? 2 : undefined} aria-label="breadcrumb">
      <LinkRouter
        underline="none"
        color="inherit"
        to="/"
        onClick={handleClickButtonTools}
      >
        <Chip
          clickable
          color="primary"
          variant="outlined"
          label={label()}
          icon={<School sx={{ mr: 0.5 }} fontSize="inherit" />}
        />
      </LinkRouter>
      {children}
    </Breadcrumbs>
  );
};
