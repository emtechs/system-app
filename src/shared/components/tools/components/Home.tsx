import { IconButton, Tooltip } from '@mui/material'
import { Home } from '@mui/icons-material'
import { useAppThemeContext } from '../../../contexts'
import { Link } from 'react-router-dom'

interface iHomeButtonProps {
  to: string
}

export const HomeButton = ({ to }: iHomeButtonProps) => {
  const { smDown } = useAppThemeContext()

  return (
    smDown && (
      <Tooltip title="Página Inicial">
        <IconButton component={Link} to={to} color="primary">
          <Home />
        </IconButton>
      </Tooltip>
    )
  )
}
