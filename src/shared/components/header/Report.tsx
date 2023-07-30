import { Print } from '@mui/icons-material'
import {
  AppBar,
  Container,
  Toolbar,
  Box,
  Typography,
  Button,
} from '@mui/material'

interface iHeaderReportProps {
  onClikPrint: () => void
}

export const HeaderReport = ({ onClikPrint }: iHeaderReportProps) => {
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
          <Box width="100%" display="flex" justifyContent="space-between">
            <Typography variant="h5">Relatório de Frequência</Typography>
            <Box display="flex" gap={1}>
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
