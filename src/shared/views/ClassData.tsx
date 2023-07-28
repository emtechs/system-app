import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardActions,
  CardContent,
  Skeleton,
  Typography,
} from '@mui/material'
import { useClassContext, useDialogContext } from '../contexts'
import { Edit, ExpandMore, RemoveDone } from '@mui/icons-material'
import { ButtonSmDown } from '../components'
import { iViewBaseProps } from '../interfaces'
import { useEffect } from 'react'

export const ViewClassData = ({ id }: iViewBaseProps) => {
  const { handleOpenActive, handleOpenEdit } = useDialogContext()
  const { loadingClass, classRetrieve, classDataRetrieve } = useClassContext()

  useEffect(() => {
    if (id) classDataRetrieve(id)
  }, [id])

  return (
    <>
      <Card>
        <CardContent>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              {loadingClass ? (
                <Skeleton width={150} />
              ) : (
                <Typography>{classRetrieve?.name}</Typography>
              )}
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Escolas: {classRetrieve?.schools}</Typography>
              <Typography>Alunos: {classRetrieve?.students}</Typography>{' '}
              <Typography>Frequências: {classRetrieve?.frequencies}</Typography>
            </AccordionDetails>
          </Accordion>
        </CardContent>
        {classRetrieve?.schools === 0 && (
          <CardActions>
            <ButtonSmDown
              title="Editar"
              startIcon={<Edit />}
              onClick={handleOpenEdit}
            />
            <ButtonSmDown
              title="Desativar"
              onClick={handleOpenActive}
              endIcon={<RemoveDone />}
              color="error"
            />
          </CardActions>
        )}
      </Card>
    </>
  )
}
