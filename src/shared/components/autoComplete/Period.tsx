import { useState, useEffect } from 'react'
import { AutocompleteElement } from 'react-hook-form-mui'
import { iPeriod } from '../../interfaces'
import { apiCalendar } from '../../services'

interface iAutoCompletePeriodProps {
  query?: string
}

export const AutoCompletePeriod = ({
  query = '',
}: iAutoCompletePeriodProps) => {
  const [periodDataSelect, setPeriodDataSelect] = useState<iPeriod[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    apiCalendar
      .listPeriod(query)
      .then((res) => setPeriodDataSelect(res.result))
      .finally(() => setLoading(false))
  }, [query])

  return (
    <AutocompleteElement
      name="period"
      label="Período"
      required
      loading={loading}
      options={
        periodDataSelect.length > 0
          ? periodDataSelect
          : [
              {
                id: 1,
                label: 'No momento, não há nenhum período cadastrado',
              },
            ]
      }
      textFieldProps={{ fullWidth: true }}
    />
  )
}
