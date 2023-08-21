import { Box, Typography, useMediaQuery } from '@mui/material'
import { iChildren } from '../../interfaces'

interface iBoxRespProps extends iChildren {
  isLogin?: boolean
  isProfile?: boolean
}

export const BoxResp = ({ children, isLogin, isProfile }: iBoxRespProps) => {
  const matches = useMediaQuery('(max-width:305px)')
  const dateData = new Date()
  if (matches) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
        width="80vw"
      >
        {!isProfile && (
          <img src="/logo.webp" width="100%" alt="De Olho na Frequência" />
        )}
        {children}
        {isLogin && (
          <Typography fontSize="0.7rem">
            {dateData.getUTCFullYear()} © EM Soluções Tecnológicas
          </Typography>
        )}
      </Box>
    )
  }
  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      {!isProfile && (
        <img src="/logo.webp" width="100%" alt="De Olho na Frequência" />
      )}
      {children}
      {isLogin && (
        <Typography>
          {dateData.getUTCFullYear()} © EM Soluções Tecnológicas
        </Typography>
      )}
    </Box>
  )
}
