import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import { useAppThemeContext } from '../../../contexts'

interface iListBaseProps {
  onClick: () => void
  name: string
}

export const ListBase = ({ onClick, name }: iListBaseProps) => {
  const { theme } = useAppThemeContext()
  return (
    <ListItem disableGutters>
      <ListItemButton onClick={onClick}>
        <ListItemAvatar>
          <Avatar
            sx={{
              bgcolor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
            }}
          >
            {name[0].toUpperCase()}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={name} />
      </ListItemButton>
    </ListItem>
  )
}
