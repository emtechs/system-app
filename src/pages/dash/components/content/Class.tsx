import { PureComponent } from 'react'
import { Box, Container, Divider, Typography } from '@mui/material'
import { iUserProfile, iReportClass } from '../../../../shared'
import { PrintClassReport, ReportLogo } from '../../components'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/pt-br'
dayjs.extend(localizedFormat)

type Props = {
  user: iUserProfile
  report: iReportClass
}

export class ContentClassReport extends PureComponent<Props> {
  public render() {
    const { report, user } = this.props

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
                height={100}
              >
                <Box display="flex" flexDirection="column" gap={1}>
                  <Typography variant="body2">
                    EM SOLUÇÕES TECNOLÓGICAS
                  </Typography>
                  <Typography variant="body2">MUNICÍPIO DE MASSAPÊ</Typography>
                  <Typography variant="body2">PORTAL DE FREQUÊNCIA</Typography>
                  <Typography variant="caption">
                    EM {dayjs().format('L')} ÀS {dayjs().format('LT')} POR{' '}
                    {user.name.toUpperCase()}
                  </Typography>
                </Box>
                <ReportLogo />
              </Box>
            </Box>
          </Container>
          <Divider />
        </Box>
        <Box mt={0.5}>
          <Divider />
          <Container maxWidth="xl">
            <Box p={1}>
              <Box justifyContent="center" display="flex" alignItems="center">
                <Typography variant="h6">RELATÓRIO DE FREQUÊNCIA</Typography>
              </Box>
            </Box>
          </Container>
          <Divider />
        </Box>
        <PrintClassReport report={report} />
      </Box>
    )
  }
}
