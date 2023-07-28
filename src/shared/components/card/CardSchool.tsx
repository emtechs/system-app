import { Avatar, Box, Card, CardContent, Typography } from '@mui/material'
import { useAppThemeContext, useSchoolContext } from '../../contexts'
import { adaptNameSchool } from '../../scripts'

export const CardSchool = () => {
  const { theme } = useAppThemeContext()
  const { schoolSelect } = useSchoolContext()

  return (
    schoolSelect && (
      <Box mx={2} width={theme.spacing(45)} maxWidth="90%">
        <Card>
          <CardContent
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing(2),
            }}
          >
            <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
              {schoolSelect.label[0].toUpperCase()}
            </Avatar>
            <Typography
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipses"
            >
              {adaptNameSchool(schoolSelect.label)}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    )
  )
}
