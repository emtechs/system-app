import { AccountCircle, Settings } from '@mui/icons-material'
import { Avatar, Box, Typography } from '@mui/material'
import { MouseEvent, useState } from 'react'
import {
  MenuLayout,
  adaptName,
  useAppThemeContext,
  useAuthContext,
} from '../../../shared'

export const HeaderProfile = () => {
  const { theme, smDown } = useAppThemeContext()
  const { userProfile } = useAuthContext()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  const handleOpenMenu = (
    event: MouseEvent<HTMLButtonElement>,
    menu: string,
  ) => {
    setAnchorEl(event.currentTarget)
    setActiveMenu(menu)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
    setActiveMenu(null)
  }

  const user = {
    name: smDown ? adaptName(userProfile?.name) : userProfile?.name,
    src: userProfile?.profile?.url,
  }

  const menus = [
    {
      id: 'settings',
      title: 'Configurações',
      icon: <Settings fontSize="small" />,
      options: [{ to: '/year', value: 'Ano Letivo' }],
    },
    {
      id: 'profile',
      title: 'Perfil',
      icon: <AccountCircle fontSize="small" />,
      options: [
        { to: '/profile/edit', value: 'Editar Perfil' },
        { to: '/profile/edit/password', value: 'Editar Senha' },
      ],
    },
  ]

  return (
    <Box pt={1} pl={1} pr={2} display="flex" justifyContent="space-between">
      <Box display="flex">
        {menus.map((menu) => (
          <MenuLayout
            key={menu.id}
            anchorEl={activeMenu === menu.id ? anchorEl : null}
            onClick={(event) => handleOpenMenu(event, menu.id)}
            onClose={handleCloseMenu}
            open={activeMenu === menu.id}
            title={menu.title}
            icon={menu.icon}
            options={menu.options}
          />
        ))}
      </Box>
      <Box display="flex" alignItems="center" gap={1}>
        <Typography>{user.name}</Typography>
        <Avatar
          src={user.src}
          sx={{
            bgcolor: theme.palette.primary.main,
            width: 30,
            height: 30,
          }}
        />
      </Box>
    </Box>
  )
}
