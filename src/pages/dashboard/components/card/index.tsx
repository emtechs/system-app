import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Paper,
} from '@mui/material'
import {
  FormContainer,
  RadioButtonGroup,
  useFormContext,
} from 'react-hook-form-mui'
import { AutoCompleteYear } from '../../../../shared/components'
import { useAuthContext } from '../../../../shared/contexts'
import { AutoCompletePeriodReportPage } from '../autoComplete'
import { ContentReport } from './Content'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import {
  reportClassSchema,
  reportStudentSchema,
} from '../../../../shared/schemas'

const ResetButton = () => {
  const { reset } = useFormContext()
  const { yearData } = useAuthContext()

  return (
    <Button
      onClick={() => {
        reset({
          type: 'class',
          year: { id: yearData?.id, label: yearData?.year },
        })
      }}
    >
      Limpar
    </Button>
  )
}

export const CardDashboardSchoolReportPage = () => {
  const { yearData } = useAuthContext()
  const [typeData, setTypeData] = useState<'class' | 'student'>('class')
  return (
    <Box my={1} mx={2} component={Paper} variant="outlined">
      <FormContainer
        onSuccess={(data) => {
          console.log(data)
        }}
        defaultValues={{
          type: 'class',
          year: { id: yearData?.id, label: yearData?.year },
        }}
        resolver={zodResolver(
          typeData === 'class' ? reportClassSchema : reportStudentSchema,
        )}
      >
        <Card>
          <CardContent>
            <Grid
              container
              direction="row"
              alignItems="center"
              p={3}
              spacing={3}
            >
              <Grid container item direction="column" spacing={2} md={3}>
                <Grid item>
                  <RadioButtonGroup
                    label="Selecione o modelo"
                    name="type"
                    options={[
                      { id: 'class', label: 'Turma' },
                      { id: 'student', label: 'Aluno' },
                    ]}
                    onChange={(value: 'class' | 'student') =>
                      setTypeData(value)
                    }
                    required
                  />
                </Grid>
                <Grid item>
                  <AutoCompleteYear />
                </Grid>
              </Grid>
              <Grid item md={5}>
                <ContentReport />
              </Grid>
              <Grid item md={4}>
                <AutoCompletePeriodReportPage />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <ResetButton />
            <Button type="submit" variant="contained" disableElevation>
              Consultar
            </Button>
          </CardActions>
        </Card>
      </FormContainer>
    </Box>
  )
}
