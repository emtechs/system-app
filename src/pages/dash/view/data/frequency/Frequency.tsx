import { useState, useCallback, useEffect } from 'react'
import {
  useDebounce,
  usePaginationContext,
  iFrequencyStudentsBase,
  iFrequency,
  apiFrequency,
  DialogRequestFrequency,
  useParamsContext,
} from '../../../../../shared'
import { TableDashboardSchoolFrequencyDataPage } from '../../../components'

interface iDataDashboardSchoolFrequencyPageProps {
  frequency_id: string
}

export const DataDashboardSchoolFrequencyPage = ({
  frequency_id,
}: iDataDashboardSchoolFrequencyPageProps) => {
  const { debounce } = useDebounce()
  const { setCount } = usePaginationContext()
  const { setIsLoading, search } = useParamsContext()
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
