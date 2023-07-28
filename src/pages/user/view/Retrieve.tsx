import { useParams } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardActions,
  CardContent,
  Skeleton,
  Typography,
} from '@mui/material'
import { ExpandMore, RemoveDone } from '@mui/icons-material'
import { DialogActiveUser } from '../../../shared/components'
import { useDialogContext } from '../../../shared/contexts'
import { iUser } from '../../../shared/interfaces'
import { apiUser } from '../../../shared/services'

export const ViewRetrieveUserPage = () => {
  const { user_id } = useParams()
  const { handleOpenActive } = useDialogContext()
  const [loadingUser, setLoadingUser] = useState(true)
  const [userRetrieve, setUserRetrieve] = useState<iUser>()

  const userDataRetrieve = useCallback((id: string, query: string) => {
    setLoadingUser(true)
    apiUser
      .retrieve(id, query)
      .then((res) => setUserRetrieve(res))
      .finally(() => setLoadingUser(false))
  }, [])

  useEffect(() => {
    if (user_id) userDataRetrieve(user_id, '')
  }, [user_id])

  const retrieve = () => userDataRetrieve(user_id || '', '')

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
              {loadingUser ? (
                <Skeleton width={300} />
              ) : (
                <Typography>{userRetrieve?.name}</Typography>
              )}
            </AccordionSummary>
            <AccordionDetails>
              <Typography>CPF: {userRetrieve?.cpf}</Typography>
              <Typography>E-mail: {userRetrieve?.email}</Typography>
            </AccordionDetails>
          </Accordion>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="error"
            disableElevation
            endIcon={<RemoveDone />}
            onClick={handleOpenActive}
          >
            Desativar
          </Button>
        </CardActions>
      </Card>
      {userRetrieve && (
        <DialogActiveUser user={userRetrieve} get={retrieve} isData />
      )}
    </>
  )
}
