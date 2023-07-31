import { Container, Box, Typography, Divider } from '@mui/material'
import { iPeriod } from '../../interfaces'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import utc from 'dayjs/plugin/utc'
dayjs.locale('pt-br')
dayjs.extend(utc)

interface iHeaderReportDataProps {
  title: string
  subTitle: string
  period: iPeriod
}

export const HeaderReportData = ({
  period,
  subTitle,
  title,
}: iHeaderReportDataProps) => {
  return (
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
              <Typography variant="h4">{title.toUpperCase()}</Typography>
              <Typography variant="h6">{subTitle.toUpperCase()}</Typography>
              <Typography variant="caption">
                {dayjs(period.date_initial).utc().format('L')} A{' '}
                {dayjs(period.date_final).utc().format('L')}
              </Typography>
            </Box>
            <Box
              display="flex"
              alignItems="flex-end"
              flexDirection="column"
              gap={0.5}
            >
              <Typography>{period.year.year}</Typography>
              <Typography>{period.category}</Typography>
              <Typography>{period.name}</Typography>
            </Box>
          </Box>
        </Box>
      </Container>
      <Divider />
    </Box>
  )
}
