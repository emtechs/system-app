import {
  Avatar,
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Paper,
  Tooltip,
} from '@mui/material'
import { Edit } from '@mui/icons-material'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { FormContainer, TextFieldElement } from 'react-hook-form-mui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import {
  DialogImage,
  Footer,
  LabelProfile,
  LayoutBasePage,
  TitleBaseItemsPage,
  apiUser,
  iUserUpdateRequest,
  useAppThemeContext,
  useAuthContext,
  userUpdateSchema,
} from '../../shared'

export const EditProfilePage = () => {
  const navigate = useNavigate()
  const { view } = useParams()
  const { userProfile, profileUser } = useAuthContext()
  const { setLoading, handleSucess, handleError } = useAppThemeContext()
  const [open, setOpen] = useState(false)

  const onClose = () => setOpen((old) => !old)

  const updateUser = async (id: string, data: iUserUpdateRequest) => {
    try {
      setLoading(true)
      await apiUser.update(id, data)
      handleSucess('Dados alterado com sucesso')
      profileUser()
      navigate('/')
    } catch {
      handleError('Não foi possível atualizar os dados no momento!')
    } finally {
      setLoading(false)
    }
  }

  if (view) return <Outlet />

  return (
    <>
      <LayoutBasePage
        title={
          <TitleBaseItemsPage>
            <LabelProfile />
            <Chip
              label="Editar Perfil"
              color="primary"
              icon={<Edit sx={{ mr: 0.5 }} fontSize="inherit" />}
            />
          </TitleBaseItemsPage>
        }
      >
        <FormContainer
          values={{
            name: userProfile?.name || '',
            email: userProfile?.email || '',
          }}
          onSuccess={(data) => {
            if (userProfile) updateUser(userProfile.id, data)
          }}
          resolver={zodResolver(userUpdateSchema)}
        >
          <Box
            m={2}
            display="flex"
            flexDirection="column"
            component={Paper}
            variant="outlined"
          >
            <Grid
              container
              direction="row"
              p={2}
              spacing={2}
              justifyContent="center"
            >
              <Grid
                item
                xs={4}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Tooltip title="Alterar foto">
                  <IconButton size="small" onClick={onClose}>
                    <Avatar
                      src={userProfile?.profile?.url}
                      sx={{ width: '150px', height: '150px' }}
                    />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid container item xs={5} justifyContent="center" spacing={2}>
                <Grid item xs={12}>
                  <TextFieldElement
                    name="name"
                    label="Nome completo"
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextFieldElement
                    name="email"
                    label="Email"
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" type="submit" fullWidth>
                    Enviar
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </FormContainer>
        <Footer />
      </LayoutBasePage>
      <DialogImage onClose={onClose} open={open} />
    </>
  )
}
