import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
} from '@mui/material'
import { LayoutBasePage } from '../../shared/layouts'
import { useSchoolContext } from '../../shared/contexts'
import { Summarize } from '@mui/icons-material'
import { Navigate } from 'react-router-dom'
import { FormContainer } from 'react-hook-form-mui'
import { useState } from 'react'
import { Footer } from '../../shared/components'

export const ReportPage = () => {
  const { schoolRetrieve } = useSchoolContext()
  const [activeStep, setActiveStep] = useState(0)

  if (!schoolRetrieve) return <Navigate to="/" />

  const steps = [
    {
      label: 'Selecione o modelo do relátorio',
      content: (
        <Box display="flex" flexDirection="column">
          <Button onClick={() => setActiveStep(1)}>Mês</Button>
          <Button onClick={() => setActiveStep(1)}>Turma</Button>
          <Button onClick={() => setActiveStep(1)}>Aluno</Button>
        </Box>
      ),
    },
    { label: 'Create an ad group' },
    { label: 'Create an ad' },
  ]

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  return (
    <LayoutBasePage
      title={
        <Chip
          label="Relatório"
          color="primary"
          icon={<Summarize sx={{ mr: 0.5 }} fontSize="inherit" />}
        />
      }
    >
      <Box my={1} mx={2} component={Paper} variant="outlined">
        <FormContainer>
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
                          Back
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </FormContainer>
      </Box>
      <Footer />
    </LayoutBasePage>
  )
}
