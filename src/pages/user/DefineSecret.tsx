import { Footer, ValidateCPF } from '../../shared/components'
import { useAppThemeContext, useUserContext } from '../../shared/contexts'
import { FormContainer, TextFieldElement } from 'react-hook-form-mui'
import { zodResolver } from '@hookform/resolvers/zod'
import { createSecretSchema } from '../../shared/schemas'
import { useEffect, useState } from 'react'
import { apiUsingNow } from '../../shared/services'
import { iUser } from '../../shared/interfaces'
import { Box, Grid, Paper, Typography } from '@mui/material'
import { LayoutBasePage } from '../../shared/layouts'

export const DefineSecretPage = () => {
  const { setLoading } = useAppThemeContext()
  const { createSecret, updateAllUser } = useUserContext()
  const [secretData, setSecretData] = useState<iUser>()

  useEffect(() => {
    setLoading(true)
    apiUsingNow
      .get<iUser[]>('users?role=SECRET')
      .then((res) => setSecretData(res.data[0]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <LayoutBasePage title="Definir Secretário">
      <FormContainer
        onSuccess={(data) => {
          if (secretData)
            updateAllUser(
              secretData.id,
              {
                is_active: false,
                role: 'SERV',
              },
              true,
              'list',
            )
          createSecret(data)
        }}
        resolver={zodResolver(createSecretSchema)}
      >
        <Box
          m={2}
          display="flex"
          flexDirection="column"
          component={Paper}
          variant="outlined"
        >
          <Grid container direction="column" p={2} spacing={2}>
            {secretData && (
              <Grid container item direction="row" justifyContent="center">
                <Grid
                  item
                  xs={12}
                  sm={9}
                  md={6}
                  lg={3}
                  display="flex"
                  justifyContent="center"
                >
                  <Box>
                    <Typography>Secretário Atual</Typography>
                    <Typography>Nome: {secretData.name}</Typography>
                    <Typography>CPF: {secretData.cpf}</Typography>
                  </Box>
                </Grid>
              </Grid>
            )}
            <Grid container item direction="row" justifyContent="center">
              <Grid item xs={12} sm={9} md={6} lg={3}>
                <TextFieldElement name="cpf" label="CPF" required fullWidth />
              </Grid>
            </Grid>
            <Grid container item direction="row" justifyContent="center">
              <Grid item xs={12} sm={9} md={6} lg={3}>
                <TextFieldElement name="name" label="Nome" required fullWidth />
              </Grid>
            </Grid>
            <Grid container item direction="row" justifyContent="center">
              <Grid item xs={12} sm={9} md={6} lg={3}>
                <ValidateCPF allNotServ />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </FormContainer>
      <Footer />
    </LayoutBasePage>
  )
}
