import { Fragment } from 'react'
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
import { iReportSchool, HeaderReportData } from '../../../../shared'
import { PrintClassReport } from './Class'

interface iPrintSchoolReportProps {
  report: iReportSchool
}

export const PrintSchoolReport = ({ report }: iPrintSchoolReportProps) => {
  const { result, classes } = report
  const { name, type, period } = result
  return (
    <Box>
      <HeaderReportData period={period} subTitle={type} title={name} />
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
              <Typography>{result.classes} TURMAS</Typography>
              <Typography>|</Typography>
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
      {type === 'resumido' ? (
        <Box mt={0.5}>
          <Divider />
          <Container maxWidth="xl">
            <Box p={1}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>TURMA</TableCell>
                    <TableCell>ALUNOS</TableCell>
                    <TableCell>FREQUÊNCIAS</TableCell>
                    <TableCell>INFREQUÊNCIA</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {classes.map((el) => {
                    const { result } = el
                    return (
                      <TableRow key={result.id}>
                        <TableCell>{result.name}</TableCell>
                        <TableCell>{result.students}</TableCell>
                        <TableCell>{result.frequencies}</TableCell>
                        <TableCell>{result.infrequency.toFixed(0)}%</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </Box>
          </Container>
          <Divider />
        </Box>
      ) : (
        <>
          {classes.map((el) => {
            if (el.students) {
              const report = { result: el.result, students: el.students }
              return (
                <PrintClassReport key={el.result.id} report={report} isSchool />
              )
            }
            return <Fragment key={el.result.id} />
          })}
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
        </>
      )}
    </Box>
  )
}
