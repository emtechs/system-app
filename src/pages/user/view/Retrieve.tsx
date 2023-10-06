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
import { Delete, ExpandMore, RemoveDone } from '@mui/icons-material'
import {
  useDialogContext,
  iUser,
  apiUser,
  ButtonSmDown,
  useAuthContext,
} from '../../../shared'
import { DialogActiveUser, DialogDeleteUser } from '../components'

export const ViewRetrieveUserPage = () => {
  const { user_id } = useParams()
  const { userProfile } = useAuthContext()
  const { handleOpenActive, handleOpenEdit } = useDialogContext()
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
          <ButtonSmDown
            title="Desativar"
            color="error"
            startIcon={<RemoveDone />}
            onClick={handleOpenActive}
          />
          {userProfile?.is_super && (
            <ButtonSmDown
              title="Excluir"
              color="warning"
              startIcon={<Delete />}
              onClick={handleOpenEdit}
            />
          )}
        </CardActions>
      </Card>
      {userRetrieve && <DialogActiveUser user={userRetrieve} />}
      {userRetrieve && <DialogDeleteUser user={userRetrieve} />}
    </>
  )
}
