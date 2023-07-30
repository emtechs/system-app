import { useFormContext } from 'react-hook-form'
import { iClass } from '../../../../shared/interfaces'
import { AutoCompleteStudent } from '../../../../shared'

export const AutoCompleteStudentReportPage = () => {
  const { watch } = useFormContext()
  const classData: iClass | undefined = watch('class')

  return (
    <AutoCompleteStudent
      query={`?key_class=${classData?.key}`}
      message="No momento, não há nenhum aluno com dados suficientes para gerar o relatório"
    />
  )
}
