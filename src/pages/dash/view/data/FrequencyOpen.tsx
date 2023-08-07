import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  apiFrequency,
  iFrequencyStudentsBase,
  usePaginationContext,
} from '../../../../shared'
import { TableDashboardSchoolFrequencyOpenPage } from '../../components'

interface iDataDashboardSchoolFrequencyOpenPageProps {
  frequency_id: string
  isAlter: boolean
}

export const DataDashboardSchoolFrequencyOpenPage = ({
  frequency_id,
  isAlter,
}: iDataDashboardSchoolFrequencyOpenPageProps) => {
  const { setIsLoading, query } = usePaginationContext()
  const [dataStudents, setDataStudents] = useState<iFrequencyStudentsBase[]>([])

  const getStudents = useCallback(
    (query_data: string) => {
      setIsLoading(true)
      apiFrequency
        .students(frequency_id, query_data)
        .then((res) => setDataStudents(res.result))
        .finally(() => setIsLoading(false))
    },
    [frequency_id],
  )

  const define_query = useMemo(() => {
    let queryData = query() + '&order=name'
    if (isAlter) queryData += '&is_alter=true'

    return queryData
  }, [isAlter, query])

  const list = () => getStudents(define_query)

  useEffect(() => getStudents(define_query), [define_query])

  return (
    <TableDashboardSchoolFrequencyOpenPage
      listData={dataStudents}
      list={list}
    />
  )
}
