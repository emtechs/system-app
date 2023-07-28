import { Box, Card, CardActionArea, useTheme } from '@mui/material'
import { useClassContext } from '../../contexts'
import { CardSchoolClassContent } from './CardSchoolClassContent'

interface iCardSchoolClassActionProps {
  onClick: () => void
}

export const CardSchoolClassAction = ({
  onClick,
}: iCardSchoolClassActionProps) => {
  const theme = useTheme()
  const { classWithSchoolSelect } = useClassContext()
  return classWithSchoolSelect ? (
    <Box mx={2} width={theme.spacing(45)} maxWidth="90%">
      <Card>
        <CardActionArea onClick={onClick}>
          <CardSchoolClassContent classData={classWithSchoolSelect.class} />
        </CardActionArea>
      </Card>
    </Box>
  ) : (
    <></>
  )
}
