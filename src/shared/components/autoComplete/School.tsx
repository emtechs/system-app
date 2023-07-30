import { useState, useEffect } from 'react'
import { AutocompleteElement } from 'react-hook-form-mui'
import { iSchool } from '../../interfaces'
import { apiSchool } from '../../services'

interface iAutoCompleteSchoolProps {
  query?: string
  isMultiple?: boolean
}

export const AutoCompleteSchool = ({
  isMultiple,
  query = '',
}: iAutoCompleteSchoolProps) => {
  const [schoolDataSelect, setSchoolDataSelect] = useState<iSchool[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    apiSchool
      .list('?is_active=true' + query)
      .then((res) => setSchoolDataSelect(res.schools))
      .finally(() => setLoading(false))
  }, [query])

  return (
    <AutocompleteElement
      name="school"
      label="Escola"
      required
      multiple={isMultiple}
      loading={loading}
      options={
        schoolDataSelect.length > 0
          ? schoolDataSelect
          : [
              {
                id: 1,
                label: 'No momento, não há nenhuma escola cadastrada',
              },
            ]
      }
      textFieldProps={{ fullWidth: true }}
    />
  )
}
