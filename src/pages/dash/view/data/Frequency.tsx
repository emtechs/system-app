import { useState, useCallback, useEffect } from 'react'
import {
  usePaginationContext,
  iFrequencyStudentsBase,
  apiFrequency,
  useDebounce,
  iFrequency,
  DialogRequestFrequency,
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
  const [frequencyData, setFrequencyData] = useState<iFrequency>()

  const getStudents = useCallback(
    (query: string) => {
      setIsLoading(true)
      apiFrequency
        .students(frequency_id, query)
        .then((res) => {
          setDataStudents(res.result)
          setFrequencyData(res.frequency)
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

  return (
    <>
      <TableDashboardSchoolFrequencyDataPage listData={dataStudents} />
      {frequencyData && <DialogRequestFrequency frequency={frequencyData} />}
    </>
  )
}
