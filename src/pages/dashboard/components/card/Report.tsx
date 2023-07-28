import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
} from '@mui/material'
import { useState } from 'react'
import { ContentReport } from './content'

export const CardDashboardSchoolReportPage = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [typeData, setTypeData] = useState<'class' | 'student'>()

  const steps = [
    {
      label: 'Selecione o modelo do relátorio',
      content: (
        <Box display="flex" flexDirection="column">
          <Button
            onClick={() => {
              setActiveStep(1)
              setTypeData('class')
            }}
          >
            Turma
          </Button>
          <Button
            onClick={() => {
              setActiveStep(1)
              setTypeData('student')
            }}
          >
            Aluno
          </Button>
        </Box>
      ),
    },
    {
      label: 'Selecione os dados do relátorio',
      content: <ContentReport type={typeData} />,
    },
  ]

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  return (
    <Box my={1} mx={2} component={Paper} variant="outlined">
      <Card>
        <CardContent>
          <Grid container direction="column" p={2} spacing={2}>
            <Grid container item direction="row" justifyContent="center">
              <Grid item md={9}>
                <Box sx={{ width: '100%' }}>
                  <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((el, index) => (
                      <Step key={index}>
                        <StepLabel>{el.label}</StepLabel>
                        <StepContent>{el.content}</StepContent>
                      </Step>
                    ))}
                  </Stepper>
                  <Box display="flex" pt={2}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Voltar
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}
