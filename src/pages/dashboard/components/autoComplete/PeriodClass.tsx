import { useState, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { AutocompleteElement } from 'react-hook-form-mui'
import { iClass, iPeriod } from '../../../../shared/interfaces'
import { apiInfrequency } from '../../../../shared/services'

export const AutoCompletePeriodClassReportPage = () => {
  const { watch } = useFormContext()
  const classData: iClass = watch('class')
  const [periodDataSelect, setPeriodDataSelect] = useState<iPeriod[]>()

  useEffect(() => {
    let query = ''
    if (classData) query = `?take=0&key_class=${classData.key}`

    apiInfrequency
      .listClass(query)
      .then((res) => setPeriodDataSelect(res.periods))
  }, [classData])

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
