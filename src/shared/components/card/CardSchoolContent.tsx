import { Avatar, CardContent, Typography } from '@mui/material'
import { iSchool } from '../../interfaces'
import { useAppThemeContext } from '../../contexts'
import { adaptName } from '../../scripts'

interface iCardSchoolContentProps {
  school: iSchool
}

export const CardSchoolContent = ({ school }: iCardSchoolContentProps) => {
  const { theme } = useAppThemeContext()
  return (
    <CardContent
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(2),
      }}
    >
      <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
        {school.name[0].toUpperCase()}
      </Avatar>
      <Typography overflow="hidden" whiteSpace="nowrap" textOverflow="ellipses">
        {adaptName(school.name)}
      </Typography>
    </CardContent>
  )
}
