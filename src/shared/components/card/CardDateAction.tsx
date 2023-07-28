import { Box, Card, CardActionArea, useTheme } from '@mui/material'
import { CardDateContent } from './CardDateContent'

interface iCardDateActionProps {
  onClick: () => void
}

export const CardDateAction = ({ onClick }: iCardDateActionProps) => {
  const theme = useTheme()
  return (
    <Box mx={2} width={theme.spacing(45)} maxWidth="90%">
      <Card>
        <CardActionArea onClick={onClick}>
          <CardDateContent />
        </CardActionArea>
      </Card>
    </Box>
  )
}
