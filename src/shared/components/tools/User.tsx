import { ReactNode, useMemo } from "react";
import { Box, Paper, TextField } from "@mui/material";
import { AddBox, ArrowBack, ClearAll } from "@mui/icons-material";
import {
  useAppThemeContext,
  useDialogContext,
  usePaginationContext,
} from "../../contexts";
import { ActiveButton, CompBase, HomeButton, UserTools } from "./components";
import { ButtonDest } from "../button";

interface iToolsUserProps {
  back?: string;
  isHome?: boolean;
  toHome?: string;
  isNew?: boolean;
  isUser?: boolean;
  titleNew?: string;
  iconNew?: ReactNode;
  isSearch?: boolean;
  isActive?: boolean;
  finish?: ReactNode;
  isReset?: boolean;
}

export const ToolsUser = ({
  back,
  isHome,
  toHome = "/",
  isNew,
  isUser,
  titleNew = "Novo",
  iconNew = <AddBox />,
  isSearch,
  isActive,
  finish,
  isReset,
}: iToolsUserProps) => {
  const { theme } = useAppThemeContext();
  const { handleOpenCreate } = useDialogContext();
  const { is_active, search, setSearch, onClickReset } = usePaginationContext();

  const disabled = useMemo(() => {
    if (search || is_active() === "&is_active=false") return false;
    return true;
  }, [search, is_active]);

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
      {back && (
        <ButtonDest to={back} title="Voltar" startIcon={<ArrowBack />} isResp />
      )}
      {isHome && <HomeButton to={toHome} />}
      {isNew && (
        <CompBase
          title={titleNew}
          startIcon={iconNew}
          onClick={handleOpenCreate}
        />
      )}
      {isUser && <UserTools />}
      {isSearch && (
        <TextField
          size="small"
          value={search ? search : ""}
          placeholder="Pesquisar..."
          onChange={(e) => setSearch?.(e.target.value)}
        />
      )}
      {isActive && <ActiveButton />}
      <Box flex={1} display="flex" justifyContent="end" gap={1}>
        {finish}
        {isReset && (
          <CompBase
            title="Limpar"
            endIcon={<ClearAll />}
            onClick={onClickReset}
            disabled={disabled}
          />
        )}
      </Box>
    </Box>
  );
};
