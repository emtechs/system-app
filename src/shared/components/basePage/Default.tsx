import { Box, Container, Paper, useMediaQuery, useTheme } from '@mui/material'
import { iChildren } from '../../interfaces'

interface iBasePageDefaultProps extends iChildren {
  padding?: number
}

export const BasePageDefault = ({
  children,
  padding = 8,
}: iBasePageDefaultProps) => {
  const matches = useMediaQuery('(max-width:395px)')
  const theme = useTheme()

  return (
    <Box bgcolor={theme.palette.background.default}>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          minHeight: '100vh',
          alignItems: 'center',
        }}
      >
        <Box
          component={Paper}
          width="100vw"
          maxWidth={400}
          display="flex"
          justifyContent="center"
          padding={matches ? 0 : padding}
          paddingTop={padding}
          paddingBottom={padding}
        >
          {children}
        </Box>
      </Container>
    </Box>
  )
}
