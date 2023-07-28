import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Paper,
  Typography,
} from '@mui/material'
import { ContentReport } from './content'
import { FormContainer, RadioButtonGroup } from 'react-hook-form-mui'
import { AutoCompleteYear, GridDashOrgan } from '../../../../shared/components'

export const CardDashboardSchoolReportPage = () => {
  const steps = [
    {
      label: 'Selecione o modelo do relátorio',
      content: (
        <Box mt={1}>
          <RadioButtonGroup
            name="type"
            options={[
              { id: 'class', label: 'Turma' },
              { id: 'student', label: 'Aluno' },
            ]}
            required
          />
        </Box>
      ),
    },
    {
      label: 'Selecione os dados do relátorio',
      content: <ContentReport />,
    },
  ]

  return (
    <Box my={1} mx={2} component={Paper} variant="outlined">
      <FormContainer
        onSuccess={(data) => {
          console.log(data)
        }}
      >
        <Card>
          <CardContent>
            <Grid container direction="row" p={2} spacing={2}>
              <Grid item md={4}>
                <Box height="100%" display="flex" flexDirection="column">
                  <Typography>Relatório de Frequência</Typography>
                  <GridDashOrgan />
                </Box>
              </Grid>
              <Grid item md={3}>
                <Box
                  display="flex"
                  flexDirection="column"
                  gap={2.5}
                  width="100%"
                  p={1}
                >
                  <RadioButtonGroup
                    label="Selecione o modelo"
                    name="type"
                    options={[
                      { id: 'class', label: 'Turma' },
                      { id: 'student', label: 'Aluno' },
                    ]}
                    required
                  />
                  <AutoCompleteYear />
                </Box>
              </Grid>
              <Grid item md={5}>
                <Box>
                  <ContentReport />
                </Box>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="submit" variant="contained" disableElevation>
              Consultar
            </Button>
          </CardActions>
        </Card>
      </FormContainer>
    </Box>
  )
}
