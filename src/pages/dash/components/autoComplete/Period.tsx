import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { iClass } from '../../../../shared/interfaces'
import { AutoCompletePeriod } from '../../../../shared'

export const AutoCompletePeriodReportPage = () => {
  const { watch } = useFormContext()
  const classData: iClass = watch('class')
  const school_id: string = watch('school_id')
  const year_id: string = watch('year_id')

  const query = useMemo(() => {
    if (classData) return `?key_class=${classData.key}`
    if (school_id && year_id)
      return `?school_id=${school_id}&year_id=${year_id}`
  }, [classData, school_id, year_id])

  return <AutoCompletePeriod query={query} />
}
