import { ChangeEvent, MouseEvent, ReactNode, useMemo, useState } from 'react'
import {
  Box,
  Checkbox,
  FormControlLabel,
  Menu,
  MenuItem,
  Paper,
  TextField,
} from '@mui/material'
import {
  AddBox,
  ClearAll,
  Dashboard,
  ManageAccountsOutlined,
  PersonOffOutlined,
  PersonOutlined,
} from '@mui/icons-material'
import {
  useAppThemeContext,
  useDialogContext,
  useDrawerContext,
  useSchoolContext,
  useParamsContext,
  ButtonDest,
} from '../../../shared'
import {
  HomeButton,
  CompBase,
  UserTools,
  ActiveButton,
  BackButton,
} from './components'

interface iToolsProps {
  isBack?: boolean
  isHome?: boolean
  toHome?: string
  isUser?: boolean
  isNew?: boolean
  titleNew?: string
  iconNew?: ReactNode
  isSearch?: boolean
  isActive?: boolean
  isDirector?: boolean
  isInfreq?: boolean
  infreq?: string
  setInfreq?: (text: string) => void
  finish?: ReactNode
  isReset?: boolean
  isDash?: boolean
}

export const Tools = ({
  isBack,
  isHome,
  toHome = '/',
  isUser,
  isNew,
  titleNew = 'Novo',
  iconNew = <AddBox />,
  isSearch,
  isActive,
  isDirector,
  isInfreq,
  infreq = '',
  setInfreq,
  finish,
  isReset,
  isDash,
}: iToolsProps) => {
  const { theme, mdDown } = useAppThemeContext()
  const { handleOpenCreate } = useDialogContext()
  const { handleDisplayDash } = useDrawerContext()
  const { schoolSelect } = useSchoolContext()
  const {
    is_active,
    director,
    setDirector,
    is_director,
    onClickReset,
    search,
    setSearch,
    selected,
  } = useParamsContext()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleChange1 = (event: ChangeEvent<HTMLInputElement>) => {
    setDirector([event.target.checked, event.target.checked])
  }

  const handleChange2 = (event: ChangeEvent<HTMLInputElement>) => {
    setDirector([event.target.checked, director[1]])
  }

  const handleChange3 = (event: ChangeEvent<HTMLInputElement>) => {
    setDirector([director[0], event.target.checked])
  }

  const disabled = useMemo(() => {
    if (
      search ||
      infreq.length > 0 ||
      is_director.length > 0 ||
      is_active() === '&is_active=false' ||
      selected.length > 0
    )
      return false
    return true
  }, [search, infreq.length, is_director.length, is_active, selected.length])

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
      {isBack && <BackButton />}
      {isHome && <HomeButton to={toHome} />}
      {isNew && (
        <CompBase
          title={titleNew}
          startIcon={iconNew}
          onClick={handleOpenCreate}
        />
      )}
      {isUser && <UserTools />}
      {isDash && (
        <ButtonDest
          title="Painel"
          to={`/${schoolSelect?.id}`}
          startIcon={<Dashboard />}
          isResp
          onClick={() => handleDisplayDash('SCHOOL')}
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
                mdDown ? <ManageAccountsOutlined color="primary" /> : 'Diretor'
              }
              control={
                <Checkbox
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
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
                'aria-labelledby': 'basic-button',
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
  )
}
