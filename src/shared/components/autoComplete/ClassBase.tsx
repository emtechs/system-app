import { AutocompleteElement } from 'react-hook-form-mui'
import { iClass } from '../../interfaces'

interface iAutoCompleteClassBaseProps {
  loading: boolean
  message?: string
  classData: iClass[]
}

export const AutoCompleteClassBase = ({
  classData,
  loading,
  message = 'No momento, não há nenhuma turma cadastrada',
}: iAutoCompleteClassBaseProps) => {
  return (
    <AutocompleteElement
      name="class"
      label="Turma"
      loading={loading}
      required
      options={
        classData.length > 0
          ? classData
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
