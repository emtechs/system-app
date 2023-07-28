import { useState, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { AutocompleteElement } from 'react-hook-form-mui'
import { iClass, iStudent } from '../../../../shared/interfaces'
import { apiStudent } from '../../../../shared/services'

export const AutoCompleteStudentReportPage = () => {
  const { watch } = useFormContext()
  const classData: iClass = watch('class')
  const [studentDataSelect, setStudentDataSelect] = useState<iStudent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    if (classData) {
      apiStudent
        .listClass(`?key_class=${classData.key}`)
        .then((res) => setStudentDataSelect(res.result))
        .finally(() => setLoading(false))
    }
  }, [classData])

  return (
    <AutocompleteElement
      name="student"
      label="Aluno"
      required
      loading={loading}
      options={
        studentDataSelect.length > 0
          ? studentDataSelect
          : [
              {
                id: 1,
                label:
                  'No momento, não há nenhum aluno com dados suficientes para gerar o relatório',
              },
            ]
      }
      textFieldProps={{ fullWidth: true }}
    />
  )
}
