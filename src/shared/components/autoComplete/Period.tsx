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
  const [periodDataSelect, setPeriodDataSelect] = useState<iPeriod[]>()

  useEffect(() => {
    apiCalendar.listPeriod(query).then((res) => setPeriodDataSelect(res))
  }, [query])

  return (
    <AutocompleteElement
      name="period"
      label="Período"
      required
      loading={!periodDataSelect}
      options={
        periodDataSelect && periodDataSelect.length > 0
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
