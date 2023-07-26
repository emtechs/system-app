import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
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
import { ExpandMore, Edit, Person, RemoveDone } from '@mui/icons-material'
import {
  ButtonSmDown,
  DialogEditSchool,
  DialogDirectorSchool,
  DialogActiveSchool,
} from '../../components'
import { useDialogContext, useSchoolContext } from '../../contexts'

export const ViewSchoolData = () => {
  const { school_id, class_id, year_id } = useParams()
  const { handleOpenActive, handleOpenDirector, handleOpenEdit } =
    useDialogContext()
  const { loadingSchool, schoolRetrieve, schoolDataRetrieve } =
    useSchoolContext()

  useEffect(() => {
    let query = ''
    if (class_id && year_id) query = `?class_id=${class_id}&year_id=${year_id}`
    if (school_id) schoolDataRetrieve(school_id, query)
  }, [class_id, school_id, year_id])

  return (
    <>
      <Card>
        <CardContent>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              {loadingSchool ? (
                <Skeleton width={300} />
              ) : (
                <Typography>{schoolRetrieve?.name}</Typography>
              )}
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Servidores: {schoolRetrieve?.servers}</Typography>
              <Typography>Turmas: {schoolRetrieve?.classes}</Typography>
              <Typography>Alunos: {schoolRetrieve?.students}</Typography>
              <Typography>
                Frequências: {schoolRetrieve?.frequencies}
              </Typography>
              <Typography>
                Diretor(a): {schoolRetrieve?.director?.name}
              </Typography>
            </AccordionDetails>
          </Accordion>
          {class_id && (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                {loadingSchool ? (
                  <Skeleton width={300} />
                ) : (
                  <Typography>{schoolRetrieve?.class?.name}</Typography>
                )}
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Alunos: {schoolRetrieve?.class?.students}
                </Typography>
                <Typography>
                  Frequências: {schoolRetrieve?.class?.frequencies}
                </Typography>
                <Typography>
                  Infrequência: {schoolRetrieve?.class?.infrequency}
                </Typography>
              </AccordionDetails>
            </Accordion>
          )}
        </CardContent>
        <CardActions>
          <ButtonSmDown
            title="Editar"
            startIcon={<Edit />}
            onClick={handleOpenEdit}
          />
          <ButtonSmDown
            title="Diretor"
            startIcon={<Person />}
            onClick={handleOpenDirector}
          />
          <ButtonSmDown
            title="Desativar"
            onClick={handleOpenActive}
            endIcon={<RemoveDone />}
            color="error"
          />
        </CardActions>
      </Card>
      {schoolRetrieve && (
        <DialogEditSchool school={schoolRetrieve} locale="data" />
      )}
      {schoolRetrieve && (
        <DialogDirectorSchool school={schoolRetrieve} locale="data" />
      )}
      {schoolRetrieve && (
        <DialogActiveSchool school={schoolRetrieve} locale="data" />
      )}
    </>
  )
}
