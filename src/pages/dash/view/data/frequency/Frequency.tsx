import { useState, useCallback, useEffect } from 'react'
import {
  useDebounce,
  usePaginationContext,
  iFrequencyStudentsBase,
  iFrequency,
  DialogRequestFrequency,
  useParamsContext,
  apiFrequencyStudent,
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

  const getStudents = useCallback((query: string) => {
    setIsLoading(true)
    apiFrequencyStudent
      .list(query)
      .then((res) => {
        setDataStudents(res.result)
        setFrequencyData(res.frequency)
        setCount(res.total)
      })
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    const query = `?frequency_id=${frequency_id}`
    if (search) {
      debounce(() => {
        getStudents(`${query}&name=${search}`)
      })
    } else getStudents(query)
  }, [frequency_id, search])

  return (
    <>
      <TableDashboardSchoolFrequencyDataPage listData={dataStudents} />
      {frequencyData && <DialogRequestFrequency frequency={frequencyData} />}
    </>
  )
}
