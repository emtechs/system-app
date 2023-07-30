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
import { iReportClass } from '../../../../shared/interfaces'

interface iPrintClassReportProps {
  report: iReportClass
}

export const PrintClassReport = ({ report }: iPrintClassReportProps) => {
  const { result, students } = report
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
                <Typography variant="h4">{result.school.name}</Typography>
                <Typography variant="h6">{result.name}</Typography>
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
              <Typography>{result.students} ALUNOS</Typography>
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
                {students.map((el) => (
                  <TableRow key={el.id}>
                    <TableCell>{el.registry}</TableCell>
                    <TableCell>{el.name}</TableCell>
                    <TableCell>{el.presences}</TableCell>
                    <TableCell>{el.justified}</TableCell>
                    <TableCell>{el.absences}</TableCell>
                    <TableCell>{el.frequencies}</TableCell>
                    <TableCell>{el.infrequency.toFixed(0)}%</TableCell>
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
  )
}
