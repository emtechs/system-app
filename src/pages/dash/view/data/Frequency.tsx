import { useState, useCallback, useEffect } from 'react'
import {
  usePaginationContext,
  iFrequencyStudentsBase,
  apiFrequency,
  useDebounce,
} from '../../../../shared'
import { TableDashboardSchoolFrequencyDataPage } from '../../components'

interface iDataDashboardSchoolFrequencyPageProps {
  frequency_id: string
}

export const DataDashboardSchoolFrequencyPage = ({
  frequency_id,
}: iDataDashboardSchoolFrequencyPageProps) => {
  const { debounce } = useDebounce()
  const { setIsLoading, search, setCount } = usePaginationContext()
  const [dataStudents, setDataStudents] = useState<iFrequencyStudentsBase[]>([])

  const getStudents = useCallback(
    (query: string) => {
      setIsLoading(true)
      apiFrequency
        .students(frequency_id, query)
        .then((res) => {
          setDataStudents(res.result)
          setCount(res.total)
        })
        .finally(() => setIsLoading(false))
    },
    [frequency_id],
  )

  useEffect(() => {
    if (search) {
      debounce(() => {
        getStudents(`?name=${search}`)
      })
    } else getStudents('')
  }, [search])

  return <TableDashboardSchoolFrequencyDataPage listData={dataStudents} />
}
