import { Box, Button, Chip, Grid, Paper } from '@mui/material'
import { Outlet, useParams } from 'react-router-dom'
import { FormContainer, TextFieldElement } from 'react-hook-form-mui'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  useAuthContext,
  useUserContext,
  LayoutBasePage,
  userUpdateSchema,
  Footer,
  LabelProfile,
  TitleBaseItemsPage,
} from '../../shared'
import { Edit } from '@mui/icons-material'

export const EditProfilePage = () => {
  const { view } = useParams()
  const { userData } = useAuthContext()
  const { updateUser } = useUserContext()

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
        defaultValues={{
          name: userData ? userData.name : '',
          email: userData ? userData.email : '',
        }}
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
