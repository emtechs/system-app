import { AddBox, ArrowBack, Home } from "@mui/icons-material";
import { Box, Paper, TextField } from "@mui/material";
import { useAppThemeContext, useDrawerContext } from "../../contexts";
import { ReactNode, useMemo } from "react";
import { Dest } from "./Dest";
import { SchoolTools } from "./School";
import { UserTools } from "./User";
import { useSearchParams } from "react-router-dom";
import { Reset } from "./Reset";

interface iToolsProps {
  back?: string;
  isBack?: boolean;
  isSingle?: boolean;
  isHome?: boolean;
  isUser?: boolean;
  school_id?: string;
  isNew?: boolean;
  destNew?: string;
  titleNew?: string;
  iconNew?: ReactNode;
  onClickNew?: () => void;
  isSearch?: boolean;
  search?: string;
  setSearch?: (text: string) => void;
  isInfreq?: boolean;
  infreq?: string;
  setInfreq?: (text: string) => void;
  finish?: ReactNode;
  onClickReset?: () => void;
}

export const Tools = ({
  back = "/",
  isBack,
  isSingle,
  isHome,
  isUser,
  school_id,
  isNew,
  destNew = "/",
  titleNew = "Novo",
  iconNew = <AddBox />,
  onClickNew,
  isSearch,
  search = "",
  setSearch,
  isInfreq,
  infreq = "",
  setInfreq,
  finish,
  onClickReset,
}: iToolsProps) => {
  const [searchParams] = useSearchParams();
  const backclick = searchParams.get("back_click");
  const { theme } = useAppThemeContext();
  const {
    handleClickButtonTools,
    handleClickUser,
    handleClickSchool,
    handleClickClass,
    handleClickFrequency,
    handleClickStudent,
  } = useDrawerContext();

  let onClickBack;

  if (backclick) {
    switch (backclick) {
      case "user":
        onClickBack = handleClickUser;
        break;
      case "school":
        onClickBack = handleClickSchool;
        break;
      case "class":
        onClickBack = handleClickClass;
        break;
      case "frequency":
        onClickBack = handleClickFrequency;
        break;
      case "student":
        onClickBack = handleClickStudent;
        break;
    }
  }

  const disabled = useMemo(() => {
    if (search.length > 0 || infreq.length > 0) return false;
    return true;
  }, [search, infreq]);

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
      height={theme.spacing(6)}
      marginX={1}
      padding={1}
      paddingX={2}
      component={Paper}
    >
      {isBack && (
        <Dest
          to={back}
          title="Voltar"
          startIcon={<ArrowBack />}
          onClick={onClickBack}
          isResp
        />
      )}
      {isSingle && (
        <Dest
          to="/"
          title="Página Inicial"
          startIcon={<Home />}
          onClick={handleClickButtonTools}
        />
      )}
      {isHome && (
        <Dest
          to="/"
          title="Página Inicial"
          startIcon={<Home />}
          onClick={handleClickButtonTools}
          isHome
        />
      )}
      {isUser && <UserTools />}
      {school_id && <SchoolTools school_id={school_id} />}
      {isNew && (
        <Dest
          to={destNew}
          title={titleNew}
          startIcon={iconNew}
          isResp
          onClick={onClickNew}
        />
      )}
      {isSearch && (
        <TextField
          size="small"
          value={search}
          placeholder="Pesquisar..."
          onChange={(e) => setSearch?.(e.target.value)}
        />
      )}
      <Box flex={1} display="flex" justifyContent="end" gap={1}>
        {isInfreq && (
          <Box width={theme.spacing(16)}>
            <TextField
              size="small"
              value={infreq}
              type="number"
              placeholder="Infrequência"
              fullWidth
              onChange={(e) => setInfreq?.(e.target.value)}
            />
          </Box>
        )}
        {finish}
        {onClickReset && <Reset onClick={onClickReset} disabled={disabled} />}
      </Box>
    </Box>
  );
};
