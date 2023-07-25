import { IconButton, Tooltip } from '@mui/material'
import { Home } from '@mui/icons-material'
import { useAppThemeContext, useDrawerContext } from '../../../contexts'
import { Link } from 'react-router-dom'

interface iHomeButtonProps {
  to: string
}

export const HomeButton = ({ to }: iHomeButtonProps) => {
  const { smDown } = useAppThemeContext()
  const { handleClickButtonTools } = useDrawerContext()
  return (
    smDown && (
      <Tooltip title="Página Inicial">
        <IconButton
          component={Link}
          to={to}
          color="primary"
          onClick={handleClickButtonTools}
        >
          <Home />
        </IconButton>
      </Tooltip>
    )
  )
}
