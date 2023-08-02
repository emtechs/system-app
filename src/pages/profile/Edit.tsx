import { Box, Button, Chip, Grid, Paper } from '@mui/material'
import { Edit } from '@mui/icons-material'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { FormContainer, TextFieldElement } from 'react-hook-form-mui'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  LayoutBasePage,
  userUpdateSchema,
  Footer,
  LabelProfile,
  TitleBaseItemsPage,
  apiUser,
  iUserUpdateRequest,
  useAppThemeContext,
  iUser,
  useAuthContext,
} from '../../shared'
import { useEffect, useState } from 'react'

export const EditProfilePage = () => {
  const navigate = useNavigate()
  const { view } = useParams()
  const { handleUserProfile } = useAuthContext()
  const { setLoading, handleSucess, handleError } = useAppThemeContext()
  const [userData, setUserData] = useState<iUser>()

  const updateUser = async (id: string, data: iUserUpdateRequest) => {
    try {
      setLoading(true)
      const user = await apiUser.update(id, data)
      handleSucess('Dados alterado com sucesso')
      handleUserProfile(user)
      navigate('/')
    } catch {
      handleError('Não foi possível atualizar os dados no momento!')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setLoading(true)
    apiUser
      .page('')
      .then((res) => setUserData(res.user))
      .finally(() => setLoading(false))
  }, [])

  if (view) return <Outlet />

  return (
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
          <Grid container direction="column" p={2} spacing={2}>
            <Grid container item direction="row" justifyContent="center">
              <Grid item xs={12} sm={9} md={6}>
                <TextFieldElement
                  name="name"
                  label="Nome completo"
                  required
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container item direction="row" justifyContent="center">
              <Grid item xs={12} sm={9} md={6}>
                <TextFieldElement
                  name="email"
                  label="Email"
                  required
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container item direction="row" justifyContent="center">
              <Grid item xs={12} sm={9} md={6} lg={3}>
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
  )
}
