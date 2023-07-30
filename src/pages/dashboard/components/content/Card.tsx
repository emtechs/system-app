import { Button, Card, CardActions, CardContent, Grid } from '@mui/material'
import {
  FieldValues,
  FormContainer,
  RadioButtonGroup,
  useFormContext,
} from 'react-hook-form-mui'
import { zodResolver } from '@hookform/resolvers/zod'
import { AutoCompleteYear } from '../../../../shared/components'
import { useAuthContext } from '../../../../shared/contexts'
import {
  reportClassSchema,
  reportStudentSchema,
} from '../../../../shared/schemas'
import { AutoCompletePeriodReportPage, ContentReport } from '../../components'

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

interface iContentCardReportProps {
  typeData: 'class' | 'student'
  handleTypeData: (newType: 'class' | 'student') => void
  onSuccess: (data: FieldValues) => void
}

export const ContentCardReport = ({
  handleTypeData,
  onSuccess,
  typeData,
}: iContentCardReportProps) => {
  const { yearData } = useAuthContext()

  return (
    <FormContainer
      onSuccess={onSuccess}
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
          <Grid container direction="row" alignItems="center" p={3} spacing={3}>
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
                    handleTypeData(value)
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
  )
}
