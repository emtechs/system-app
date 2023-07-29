import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { Home, Print } from '@mui/icons-material'
import { Footer } from '../shared/components'

export const Test = () => {
  return (
    <Box display="flex" flexDirection="column">
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
                  startIcon={<Home />}
                  component={Link}
                  to="/"
                >
                  Início
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  disableElevation
                  startIcon={<Print />}
                >
                  Imprimir
                </Button>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box>
        <Box mt={0.5}>
          <Divider />
          <Container maxWidth="xl">
            <Box p={1}>
              <Box
                justifyContent="space-between"
                display="flex"
                alignItems="center"
                gap={1.5}
              >
                <Box display="flex" flexDirection="column" gap={1}>
                  <Typography variant="h4">
                    CEI DEPUTADO VILMAR PONTES
                  </Typography>
                  <Typography variant="h6">CRECHE A</Typography>
                </Box>
                <Box
                  display="flex"
                  alignItems="flex-end"
                  flexDirection="column"
                  gap={0.5}
                >
                  <Typography>2023</Typography>
                  <Typography>SEMESTRE</Typography>
                  <Typography>1º Semestre</Typography>
                </Box>
              </Box>
            </Box>
          </Container>
          <Divider />
        </Box>
        <Box mt={0.5}>
          <Divider />
          <Container maxWidth="xl">
            <Box p={1}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap={1.5}
              >
                <Typography>25 ALUNOS</Typography>
                <Typography>|</Typography>
                <Typography>2 FREQUÊNCIAS</Typography>
                <Typography>|</Typography>
                <Typography>12% INFREQUÊNCIA</Typography>
              </Box>
            </Box>
          </Container>
          <Divider />
        </Box>
        <Box mt={0.5}>
          <Divider />
          <Container maxWidth="xl">
            <Box p={1}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>MATRÍCULA</TableCell>
                    <TableCell>ALUNO</TableCell>
                    <TableCell>P</TableCell>
                    <TableCell>J</TableCell>
                    <TableCell>F</TableCell>
                    <TableCell>T</TableCell>
                    <TableCell>I</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>5039331</TableCell>
                    <TableCell>ANA ISIS MARIANO LOPES</TableCell>
                    <TableCell>0</TableCell>
                    <TableCell>0</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>100%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Container>
          <Divider />
        </Box>
        <Box mt={0.5}>
          <Divider />
          <Container maxWidth="xl">
            <Box p={1}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap={1.5}
              >
                <Typography>P - PRESENÇAS</Typography>
                <Typography>|</Typography>
                <Typography>J - JUSTIFICADAS</Typography>
                <Typography>|</Typography>
                <Typography>F - FALTAS</Typography>
                <Typography>|</Typography>
                <Typography>T - TOTAL</Typography>
                <Typography>|</Typography>
                <Typography>I - INFREQUÊNCIA</Typography>
              </Box>
            </Box>
          </Container>
          <Divider />
        </Box>
      </Box>
      <Footer />
    </Box>
  )
}
