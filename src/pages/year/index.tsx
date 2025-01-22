import { Today } from '@mui/icons-material'
import { Box, Button, Chip, Grid, Paper } from '@mui/material'
import { FormContainer } from 'react-hook-form-mui'
import { useNavigate } from 'react-router-dom'
import {
  AutoCompletePeriod,
  Footer,
  LayoutBasePage,
  TitleBaseItemsPage,
  useAuthContext,
} from '../../shared'

export const YearPage = () => {
  const navigate = useNavigate()
  const { yearData, handleYearStore } = useAuthContext()

  return (
    <LayoutBasePage
      title={
        <TitleBaseItemsPage>
          <Chip
            label="Editar Ano Letivo"
            color="primary"
            icon={<Today sx={{ mr: 0.5 }} fontSize="inherit" />}
          />
        </TitleBaseItemsPage>
      }
    >
      <FormContainer
        onSuccess={(data) => {
          if (data.period.label) {
            localStorage.setItem('@EMTechs:year', data.period.label)
            handleYearStore(+data.period.label)
            navigate('/')
          }
        }}
        defaultValues={{ period: { id: yearData?.id, label: yearData?.year } }}
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
                <AutoCompletePeriod query="?category=ANO" />
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
