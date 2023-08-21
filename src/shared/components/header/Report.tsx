import { ArrowBack, Print } from '@mui/icons-material'
import { AppBar, Container, Toolbar, Box, Button } from '@mui/material'

interface iHeaderReportProps {
  onClikPrint: () => void
  onClikBack: () => void
}

export const HeaderReport = ({
  onClikPrint,
  onClikBack,
}: iHeaderReportProps) => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box ml={2} mr={2} height={80}>
            <img
              style={{ height: '100%' }}
              src="/header.webp"
              alt="Portal de Frequência"
            />
          </Box>
          <Box
            width="100%"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <img src="/logo_out.webp" alt="De Olho na Frequência" />
            <Box display="flex" gap={1}>
              <Button
                color="secondary"
                variant="contained"
                disableElevation
                startIcon={<ArrowBack />}
                onClick={onClikBack}
              >
                Voltar
              </Button>
              <Button
                color="secondary"
                variant="contained"
                disableElevation
                startIcon={<Print />}
                onClick={onClikPrint}
              >
                Imprimir
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
