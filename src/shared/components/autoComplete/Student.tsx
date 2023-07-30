import { useState, useEffect } from 'react'
import { AutocompleteElement } from 'react-hook-form-mui'
import { iStudent } from '../../interfaces'
import { apiStudent } from '../../services'

interface iAutoCompleteStudentProps {
  query?: string
  message?: string
}

export const AutoCompleteStudent = ({
  query = '',
  message = 'No momento, não há nenhum aluno cadastrado',
}: iAutoCompleteStudentProps) => {
  const [studentDataSelect, setStudentDataSelect] = useState<iStudent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    apiStudent
      .listClass(query)
      .then((res) => setStudentDataSelect(res.result))
      .finally(() => setLoading(false))
  }, [query])

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
                label: message,
              },
            ]
      }
      textFieldProps={{ fullWidth: true }}
    />
  )
}
