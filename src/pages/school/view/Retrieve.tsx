import { useParams } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
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
} from '../../../shared/components'
import { useDialogContext } from '../../../shared/contexts'
import { iSchool } from '../../../shared/interfaces'
import { apiSchool } from '../../../shared/services'
import { useVerifySchool } from '../../../shared/hooks'

export const ViewRetrieveSchoolPage = () => {
  const { school_id } = useParams()
  const { handleOpenActive, handleOpenDirector, handleOpenEdit } =
    useDialogContext()
  const [schoolRetrieve, setSchoolRetrieve] = useState<iSchool>()
  const [loadingSchool, setLoadingSchool] = useState(false)
  const { verifySchool } = useVerifySchool()

  const schoolDataRetrieve = useCallback((id: string, query: string) => {
    setLoadingSchool(true)
    apiSchool
      .retrieve(id, query)
      .then((res) => setSchoolRetrieve(res))
      .finally(() => setLoadingSchool(false))
  }, [])

  useEffect(() => {
    if (school_id) schoolDataRetrieve(school_id, '')
  }, [school_id])

  const retrieve = () => schoolDataRetrieve(school_id || '', '')
  const retrieveEdit = () => {
    schoolDataRetrieve(school_id || '', '')
    verifySchool(school_id || '')
  }

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
        <DialogEditSchool school={schoolRetrieve} getData={retrieveEdit} />
      )}
      {schoolRetrieve && (
        <DialogDirectorSchool school={schoolRetrieve} getData={retrieve} />
      )}
      {schoolRetrieve && <DialogActiveSchool school={schoolRetrieve} />}
    </>
  )
}
