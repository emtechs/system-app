import {
  Box,
  Divider,
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material'
import { iReportStudent } from '../../../../shared/interfaces'

interface iPrintStudentReportProps {
  report: iReportStudent
}

export const PrintStudentReport = ({ report }: iPrintStudentReportProps) => {
  const { result, frequencies } = report
  return (
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
                <Typography variant="h4">{result.name}</Typography>
                <Typography variant="h6">
                  {result.school.name} - {result.class.name}
                </Typography>
              </Box>
              <Box
                display="flex"
                alignItems="flex-end"
                flexDirection="column"
                gap={0.5}
              >
                <Typography>{result.year.year}</Typography>
                <Typography>{result.period.category}</Typography>
                <Typography>{result.period.name}</Typography>
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
              <Typography>{result.presences} PRESENÇAS</Typography>
              <Typography>|</Typography>
              <Typography>{result.justified} JUSTIFICADAS</Typography>
              <Typography>|</Typography>
              <Typography>{result.absences} FALTAS</Typography>
              <Typography>|</Typography>
              <Typography>{result.frequencies} FREQUÊNCIAS</Typography>
              <Typography>|</Typography>
              <Typography>
                {result.infrequency.toFixed(0)}% INFREQUÊNCIA
              </Typography>
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
                  <TableCell>DATA</TableCell>
                  <TableCell>ESTADO</TableCell>
                  <TableCell>JUSTIFICATIVA</TableCell>
                  <TableCell>USUÁRIO</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {frequencies.map((el) => (
                  <TableRow key={el.id}>
                    <TableCell>{el.date}</TableCell>
                    <TableCell>{el.status.toUpperCase()}</TableCell>
                    <TableCell>
                      {el.justification ? el.justification.toUpperCase() : '*'}
                    </TableCell>
                    <TableCell>{el.user.name.toUpperCase()}</TableCell>
                  </TableRow>
                ))}
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
              <Typography>* - PRESENTE OU FALTA NÃO JUSTIFICADA</Typography>
            </Box>
          </Box>
        </Container>
        <Divider />
      </Box>
    </Box>
  )
}
