import { useState, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { AutocompleteElement } from 'react-hook-form-mui'
import { iStudent, iYear } from '../../../../shared/interfaces'
import { apiStudent } from '../../../../shared/services'
import { useSchoolContext } from '../../../../shared/contexts'

export const AutoCompleteStudentReportPage = () => {
  const { watch } = useFormContext()
  const { schoolSelect } = useSchoolContext()
  const year: iYear = watch('year')
  const [studentDataSelect, setStudentDataSelect] = useState<iStudent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    if (year && schoolSelect) {
      apiStudent
        .listClass(
          `?is_report=true&school_id=${schoolSelect.id}&year_id=${year.id}`,
        )
        .then((res) => setStudentDataSelect(res.result))
        .finally(() => setLoading(false))
    }
  }, [schoolSelect, year])

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
