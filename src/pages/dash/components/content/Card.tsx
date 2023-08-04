import { useMemo } from 'react'
import { Button, Card, CardActions, CardContent, Grid } from '@mui/material'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  FieldValues,
  FormContainer,
  RadioButtonGroup,
  useFormContext,
} from 'react-hook-form-mui'
import {
  useAuthContext,
  useSchoolContext,
  iReport,
  reportClassSchema,
  reportSchoolSchema,
  reportStudentSchema,
  reportSchema,
  AutoCompleteYear,
  reportCustomSchema,
  reportCustomClassSchema,
  reportCustomSchoolSchema,
  reportCustomStudentSchema,
} from '../../../../shared'
import {
  AutoCompletePeriodReportPage,
  ContentReport,
  ContentReportCustom,
} from '../../components'

const ResetButton = () => {
  const { reset } = useFormContext()
  const { yearData } = useAuthContext()
  const { schoolSelect } = useSchoolContext()

  return (
    <Button
      onClick={() => {
        reset({
          year: { id: yearData?.id, label: yearData?.year },
          school_id: schoolSelect?.id,
        })
      }}
    >
      Limpar
    </Button>
  )
}

interface iContentCardReportProps {
  typeData?: iReport
  handleTypeData: (newType: iReport) => void
  onSuccess: (data: FieldValues) => void
  view?: string
}

export const ContentCardReport = ({
  handleTypeData,
  onSuccess,
  typeData,
  view,
}: iContentCardReportProps) => {
  const { yearData } = useAuthContext()
  const { schoolSelect } = useSchoolContext()

  const schema = useMemo(() => {
    switch (typeData) {
      case 'class':
        if (view) return reportCustomClassSchema
        return reportClassSchema

      case 'school':
        if (view) return reportCustomSchoolSchema
        return reportSchoolSchema

      case 'student':
        if (view) return reportCustomStudentSchema
        return reportStudentSchema

      default:
        if (view) return reportCustomSchema
        return reportSchema
    }
  }, [typeData, view])

  return (
    <FormContainer
      onSuccess={onSuccess}
      defaultValues={{
        year: { id: yearData?.id, label: yearData?.year },
        school_id: schoolSelect?.id,
      }}
      resolver={zodResolver(schema)}
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
                    { id: 'school', label: 'Escola' },
                    { id: 'class', label: 'Turma' },
                    { id: 'student', label: 'Aluno' },
                  ]}
                  onChange={(value: iReport) => handleTypeData(value)}
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
              {view ? (
                <ContentReportCustom />
              ) : (
                <AutoCompletePeriodReportPage />
              )}
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
