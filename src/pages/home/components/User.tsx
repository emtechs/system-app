import { Box, Divider, Grid, Paper, Typography } from '@mui/material'
import { AccountBox, Today, WavingHand } from '@mui/icons-material'
import { iPeriod, iUser } from '../../../shared'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/pt-br'
dayjs.extend(localizedFormat)

interface iUserProps {
  user?: iUser
  periods: iPeriod[]
}

export const User = ({ user, periods }: iUserProps) => {
  return (
    <Grid item xs={12} md={3}>
      <Box mb={2} component={Paper}>
        <Box
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          p={1}
        >
          <Typography
            component="div"
            variant="body1"
            display="flex"
            alignItems="center"
            gap={1}
          >
            <Today />
            Período
          </Typography>
        </Box>
        <Divider />
        <Box p={1}>
          <Typography
            variant="subtitle2"
            textAlign="center"
            fontWeight="bolder"
            mb={1}
          >
            {dayjs().format('dddd, LL')}
          </Typography>
          <Grid container px={2}>
            <Grid
              item
              xs={6}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <WavingHand fontSize="large" />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" textAlign="right">
                {periods.filter((el) => el.category === 'BIMESTRE')[0].name}
              </Typography>
              <Typography variant="subtitle2" textAlign="right">
                {periods.filter((el) => el.category === 'SEMESTRE')[0].name}
              </Typography>
              <Typography variant="subtitle2" textAlign="right">
                {periods.filter((el) => el.category === 'ANO')[0].name}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box mb={2} component={Paper}>
        <Box
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          p={1}
        >
          <Typography
            component="div"
            variant="body1"
            display="flex"
            alignItems="center"
            gap={1}
          >
            <AccountBox />
            Meu Cadastro
          </Typography>
        </Box>
        <Divider />
        <Box display="flex" flexDirection="column" gap={1} p={1}>
          <Typography
            component="div"
            display="flex"
            gap={1}
            fontWeight="bolder"
          >
            Nome: <Typography variant="subtitle2">{user?.name}</Typography>
          </Typography>
          <Typography
            component="div"
            display="flex"
            gap={1}
            fontWeight="bolder"
          >
            CPF: <Typography variant="subtitle2">{user?.cpf}</Typography>
          </Typography>
          <Typography
            component="div"
            display="flex"
            gap={1}
            fontWeight="bolder"
          >
            E-mail: <Typography variant="subtitle2">{user?.email}</Typography>
          </Typography>
        </Box>
      </Box>
    </Grid>
  )
}
