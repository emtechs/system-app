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
import { useDialogContext, useUserContext } from '../contexts'
import { ExpandMore, RemoveDone } from '@mui/icons-material'
import { useEffect } from 'react'
import { DialogActiveUser } from '../components'
import { useParams } from 'react-router-dom'

export const ViewUserData = () => {
  const { user_id } = useParams()
  const { handleOpenActive } = useDialogContext()
  const { loadingUser, userRetrieve, userDataRetrieve } = useUserContext()

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
      {userRetrieve && <DialogActiveUser user={userRetrieve} />}
    </>
  )
}
