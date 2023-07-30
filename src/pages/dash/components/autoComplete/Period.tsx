import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { iClass, iReport, iYear } from '../../../../shared/interfaces'
import { AutoCompletePeriod } from '../../../../shared'

export const AutoCompletePeriodReportPage = () => {
  const { watch } = useFormContext()
  const typeData: iReport = watch('type')
  const classData: iClass = watch('class')
  const yearData: iYear = watch('year')
  const school_id: string = watch('school_id')

  const query = useMemo(() => {
    if (classData) return `?key_class=${classData.key}`
    if (typeData === 'school' && school_id && yearData)
      return `?school_id=${school_id}&year_id=${yearData.id}`
  }, [classData, school_id, typeData, yearData])

  return <AutoCompletePeriod query={query} />
}
