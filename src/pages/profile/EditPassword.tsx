import { Box, Button, Chip, Grid, Paper } from '@mui/material'
import { Password } from '@mui/icons-material'
import { FormContainer, PasswordElement } from 'react-hook-form-mui'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  useAuthContext,
  LayoutBasePage,
  userPasswordSchema,
  Footer,
  LabelProfile,
  TitleBaseItemsPage,
  apiUser,
  iUserPasswordRequest,
  useAppThemeContext,
} from '../../shared'
import { useNavigate } from 'react-router-dom'

export const EditPasswordPage = () => {
  const navigate = useNavigate()
  const { setLoading, handleSucess, handleError } = useAppThemeContext()
  const { userProfile } = useAuthContext()

  const editPassword = async (id: string, data: iUserPasswordRequest) => {
    try {
      setLoading(true)
      await apiUser.update(id, data)
      handleSucess('Senha alterada com sucesso')
      navigate('/')
    } catch {
      handleError('Senha atual incorreta!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <LayoutBasePage
      title={
        <TitleBaseItemsPage>
          <LabelProfile />
          <Chip
            label="Editar Senha"
            color="primary"
            icon={<Password sx={{ mr: 0.5 }} fontSize="inherit" />}
          />
        </TitleBaseItemsPage>
      }
    >
      <FormContainer
        onSuccess={(data) => {
          if (userProfile) editPassword(userProfile.id, data)
        }}
        resolver={zodResolver(userPasswordSchema)}
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
              <Grid item xs={12} sm={9} md={6} lg={3}>
                <PasswordElement
                  name="old_password"
                  label="Senha Atual"
                  required
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container item direction="row" justifyContent="center">
              <Grid item xs={12} sm={9} md={6} lg={3}>
                <PasswordElement
                  name="password"
                  label="Nova Senha"
                  required
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container item direction="row" justifyContent="center">
              <Grid item xs={12} sm={9} md={6} lg={3}>
                <PasswordElement
                  name="repeat_password"
                  label="Confirmar Nova Senha"
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
