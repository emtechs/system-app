import { useState, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { AutocompleteElement } from 'react-hook-form-mui'
import { iClass, iSelectBase } from '../../../../shared/interfaces'
import { apiCalendar } from '../../../../shared/services'

export const AutoCompletePeriodReportPage = () => {
  const { watch } = useFormContext()
  const classData: iClass = watch('class')
  const [periodDataSelect, setPeriodDataSelect] = useState<iSelectBase[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    if (classData)
      apiCalendar
        .listPeriod(`?key_class=${classData.key}`)
        .then((res) => setPeriodDataSelect(res))
        .finally(() => setLoading(false))
  }, [classData])

  return (
    <AutocompleteElement
      name="period"
      label="Período"
      required
      loading={loading}
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
