import { useState, useEffect } from 'react'
import { iYear } from '../../interfaces'
import { apiCalendar } from '../../services'
import { AutocompleteElement } from 'react-hook-form-mui'

export const AutoCompleteYear = () => {
  const [yearDataSelect, setYearDataSelect] = useState<iYear[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    apiCalendar
      .listYear()
      .then((res) => setYearDataSelect(res))
      .finally(() => setLoading(false))
  }, [])

  return (
    <AutocompleteElement
      name="year"
      label="Ano Letivo"
      required
      loading={loading}
      options={
        yearDataSelect.length > 0
          ? yearDataSelect
          : [
              {
                id: 1,
                label: 'No momento, não há nenhum ano cadastrado',
              },
            ]
      }
    />
  )
}
