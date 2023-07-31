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
import { iReportClass, HeaderReportData } from '../../../../shared'

interface iPrintClassReportProps {
  report: iReportClass
  isSchool?: boolean
}

export const PrintClassReport = ({
  report,
  isSchool,
}: iPrintClassReportProps) => {
  const { result, students } = report
  const { name, school, period } = result

  return (
    <Box>
      {isSchool ? (
        <Box mt={0.5}>
          <Divider />
          <Container maxWidth="xl">
            <Box p={1}>
              <Box justifyContent="center" display="flex" alignItems="center">
                <Typography variant="h4">{name}</Typography>
              </Box>
            </Box>
          </Container>
          <Divider />
        </Box>
      ) : (
        <HeaderReportData period={period} subTitle={name} title={school.name} />
      )}
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
      {!isSchool && (
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
      )}
    </Box>
  )
}
