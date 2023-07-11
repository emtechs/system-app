import { ChangeEvent, MouseEvent, ReactNode, useMemo, useState } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Menu,
  MenuItem,
  Paper,
  TextField,
} from "@mui/material";
import {
  AddBox,
  ArrowBack,
  ClearAll,
  Home,
  ManageAccountsOutlined,
  PersonOffOutlined,
  PersonOutlined,
} from "@mui/icons-material";
import {
  useAppThemeContext,
  useDrawerContext,
  usePaginationContext,
} from "../../contexts";
import { ActiveButton, CompBase, HomeButton, UserTools } from "./components";
import { ButtonDest } from "../button";

interface iToolsProps {
  back?: string;
  isSingle?: boolean;
  isHome?: boolean;
  toHome?: string;
  isUser?: boolean;
  titleNew?: string;
  iconNew?: ReactNode;
  onClickNew?: () => void;
  isSearch?: boolean;
  isActive?: boolean;
  isDirector?: boolean;
  isInfreq?: boolean;
  infreq?: string;
  setInfreq?: (text: string) => void;
  finish?: ReactNode;
  isReset?: boolean;
}

export const Tools = ({
  back,
  isSingle,
  isHome,
  toHome = "/",
  isUser,
  titleNew = "Novo",
  iconNew = <AddBox />,
  onClickNew,
  isSearch,
  isActive,
  isDirector,
  isInfreq,
  infreq = "",
  setInfreq,
  finish,
  isReset,
}: iToolsProps) => {
  const { theme, mdDown } = useAppThemeContext();
  const {
    is_active,
    is_director,
    search,
    setSearch,
    director,
    setDirector,
    onClickReset,
  } = usePaginationContext();
  const { handleClickButtonTools } = useDrawerContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChange1 = (event: ChangeEvent<HTMLInputElement>) => {
    setDirector([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event: ChangeEvent<HTMLInputElement>) => {
    setDirector([event.target.checked, director[1]]);
  };

  const handleChange3 = (event: ChangeEvent<HTMLInputElement>) => {
    setDirector([director[0], event.target.checked]);
  };

  const disabled = useMemo(() => {
    if (
      search ||
      infreq.length > 0 ||
      is_director.length > 0 ||
      is_active() === "&is_active=false"
    )
      return false;
    return true;
  }, [search, infreq, is_director, is_active]);

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
      {isSingle && (
        <ButtonDest
          to={toHome}
          title="Página Inicial"
          startIcon={<Home />}
          onClick={handleClickButtonTools}
        />
      )}
      {isHome && <HomeButton to={toHome} />}
      {onClickNew && (
        <CompBase title={titleNew} startIcon={iconNew} onClick={onClickNew} />
      )}
      {isUser && <UserTools />}
      {isSearch && (
        <TextField
          size="small"
          value={search}
          placeholder="Pesquisar..."
          onChange={(e) => setSearch?.(e.target.value)}
        />
      )}
      {isActive && <ActiveButton />}
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
        {isDirector && (
          <>
            <FormControlLabel
              label={
                mdDown ? <ManageAccountsOutlined color="primary" /> : "Diretor"
              }
              control={
                <Checkbox
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  checked={director[0] && director[1]}
                  indeterminate={director[0] !== director[1]}
                  onChange={handleChange1}
                  onClick={handleClick}
                />
              }
            />
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem>
                <FormControlLabel
                  label={<PersonOutlined color="primary" />}
                  control={
                    <Checkbox checked={director[0]} onChange={handleChange2} />
                  }
                />
              </MenuItem>
              <MenuItem>
                <FormControlLabel
                  label={<PersonOffOutlined color="primary" />}
                  control={
                    <Checkbox checked={director[1]} onChange={handleChange3} />
                  }
                />
              </MenuItem>
            </Menu>
          </>
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
