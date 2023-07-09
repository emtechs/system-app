import { ReactNode, useMemo } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { AddBox, ArrowBack, ClearAll } from "@mui/icons-material";
import {
  useAppThemeContext,
  useDialogContext,
  usePaginationContext,
  useUserContext,
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
  isRole?: boolean;
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
  isRole,
  isReset,
}: iToolsUserProps) => {
  const { theme } = useAppThemeContext();
  const { handleOpenCreate } = useDialogContext();
  const { search, setSearch, rolesData, setRole, onClickReset, role } =
    useUserContext();
  const { is_active } = usePaginationContext();

  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };

  const disabled = useMemo(() => {
    if (search || is_active() === "&is_active=false" || role) return false;
    return true;
  }, [search, is_active, role]);

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
        {isRole && (
          <Box width={140}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-select-small-label">Função</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={role}
                label="Função"
                onChange={handleChange}
              >
                {rolesData?.map((el) => (
                  <MenuItem key={el.id} value={el.id}>
                    {el.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}
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
