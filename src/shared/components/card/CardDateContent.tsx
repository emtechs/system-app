import { Avatar, CardContent, Typography } from '@mui/material'
import { useAppThemeContext, useCalendarContext } from '../../contexts'
import { EventAvailable } from '@mui/icons-material'

export const CardDateContent = () => {
  const { theme } = useAppThemeContext()
  const { dateData } = useCalendarContext()
  return (
    <CardContent
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(2),
      }}
    >
      <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
        <EventAvailable />
      </Avatar>
      <Typography>{dateData.format('dddd, LL')}</Typography>
    </CardContent>
  )
}
