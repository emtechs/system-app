import { Avatar, CardContent, Typography } from '@mui/material'
import { iClass } from '../../interfaces'
import { useAppThemeContext } from '../../contexts'
import { adaptName } from '../../scripts'

interface iCardSchoolClassContentProps {
  classData: iClass
}

export const CardSchoolClassContent = ({
  classData,
}: iCardSchoolClassContentProps) => {
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
        {classData.name[0].toUpperCase()}
      </Avatar>
      <Typography overflow="hidden" whiteSpace="nowrap" textOverflow="ellipses">
        {adaptName(classData.name)}
      </Typography>
    </CardContent>
  )
}
