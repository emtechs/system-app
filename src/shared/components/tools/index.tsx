import { ChangeEvent, MouseEvent, ReactNode, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
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
  useSchoolContext,
} from "../../contexts";
import {
  ActiveButton,
  CompBase,
  Dest,
  SchoolTools,
  UserTools,
} from "./components";

interface iToolsProps {
  back?: string;
  isBack?: boolean;
  isSingle?: boolean;
  isHome?: boolean;
  isUser?: boolean;
  isSchool?: boolean;
  isNew?: boolean;
  titleNew?: string;
  iconNew?: ReactNode;
  onClickNew?: () => void;
  isSearch?: boolean;
  search?: string;
  setSearch?: (text: string) => void;
  isActive?: boolean;
  isDirector?: boolean;
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
  isSchool,
  isNew,
  titleNew = "Novo",
  iconNew = <AddBox />,
  onClickNew,
  isSearch,
  search = "",
  setSearch,
  isActive,
  isDirector,
  isInfreq,
  infreq = "",
  setInfreq,
  finish,
  onClickReset,
}: iToolsProps) => {
  const [searchParams] = useSearchParams();
  const backclick = searchParams.get("back_click");
  const { theme, mdDown } = useAppThemeContext();
  const { director, setDirector, is_director } = useSchoolContext();
  const { is_active } = usePaginationContext();
  const {
    handleClickButtonTools,
    handleClickUser,
    handleClickSchool,
    handleClickClass,
    handleClickFrequency,
    handleClickStudent,
  } = useDrawerContext();
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
    if (
      search.length > 0 ||
      infreq.length > 0 ||
      is_director().length > 0 ||
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
      {isNew && (
        <CompBase title={titleNew} startIcon={iconNew} onClick={onClickNew} />
      )}
      {isUser && <UserTools />}
      {isSchool && <SchoolTools />}
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
        {onClickReset && (
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
