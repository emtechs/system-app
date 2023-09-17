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
import { useCallback, useEffect, useState } from 'react'
import {
  useAuthContext,
  useAppThemeContext,
  iUser,
  iUserUpdateRequest,
  apiUser,
  iAvatarRequest,
  apiImage,
  LayoutBasePage,
  TitleBaseItemsPage,
  LabelProfile,
  userUpdateSchema,
  Footer,
  DialogBaseChildren,
  avatarSchema,
  InputFile,
} from '../../shared'

export const EditProfilePage = () => {
  const navigate = useNavigate()
  const { view } = useParams()
  const { handleUserProfile } = useAuthContext()
  const { setLoading, handleSucess, handleError } = useAppThemeContext()
  const [userData, setUserData] = useState<iUser>()
  const [open, setOpen] = useState(false)

  const onClose = () => setOpen((old) => !old)

  const updateUser = async (id: string, data: iUserUpdateRequest) => {
    try {
      setLoading(true)
      await apiUser.update(id, data)
      handleSucess('Dados alterado com sucesso')
      getUser()
      navigate('/')
    } catch {
      handleError('Não foi possível atualizar os dados no momento!')
    } finally {
      setLoading(false)
    }
  }

  const updateImage = async (data: iAvatarRequest) => {
    try {
      onClose()
      setLoading(true)
      const dataImage = new FormData()
      if (data.avatar) dataImage.append('image', data.avatar)
      await apiImage.createUser(dataImage)
      handleSucess('Foto alterada com sucesso')
      getUser()
    } catch {
      handleError('Não foi possível atualizar a foto no momento!')
    } finally {
      setLoading(false)
    }
  }

  const getUser = useCallback(() => {
    setLoading(true)
    apiUser
      .page('')
      .then((res) => {
        setUserData(res.user)
        handleUserProfile(res.user)
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => getUser(), [])

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
          values={{ name: userData?.name || '', email: userData?.email || '' }}
          onSuccess={(data) => {
            if (userData) updateUser(userData.id, data)
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
                      src={userData?.profile?.url}
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
      <DialogBaseChildren
        open={open}
        onClose={onClose}
        description=""
        title="Alterar Foto de Perfil"
      >
        <FormContainer
          onSuccess={updateImage}
          resolver={zodResolver(avatarSchema)}
        >
          <Box
            display="flex"
            gap={2}
            justifyContent="center"
            alignItems="center"
          >
            <InputFile label="Foto de Perfil" />
            <Button variant="contained" type="submit">
              Salvar
            </Button>
          </Box>
        </FormContainer>
      </DialogBaseChildren>
    </>
  )
}
