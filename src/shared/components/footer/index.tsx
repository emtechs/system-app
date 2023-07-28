import { Box, Typography } from '@mui/material'
import { useAppThemeContext } from '../../contexts'

export const Footer = () => {
  const { theme } = useAppThemeContext()
  const dateData = new Date()

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
      p={1}
      height={theme.spacing(7)}
    >
      <Typography variant="overline">
        {dateData.getUTCFullYear()} © EM Soluções Tecnológicas
      </Typography>
    </Box>
  )
}
