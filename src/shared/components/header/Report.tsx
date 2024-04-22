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
    <AppBar position="static" color="inherit">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            width="100%"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <img
              src="/logo.webp"
              alt="EMTI Digital - Massapê - Frequência"
              className="h-12"
            />
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
