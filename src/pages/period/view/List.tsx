import { useCallback, useEffect, useState } from 'react'
import {
  useDebounce,
  usePaginationContext,
  iPeriod,
  apiCalendar,
  useParamsContext,
} from '../../../shared'
import {
  DialogCreateYearPeriod,
  DialogEditPeriod,
  TablePeriodPage,
} from '../components'

export const ViewPeriodPage = () => {
  const { debounce } = useDebounce()
  const { search, setIsLoading } = useParamsContext()
  const { setCount } = usePaginationContext()
  const [listData, setListData] = useState<iPeriod[]>([])
  const [periodData, setPeriodData] = useState<iPeriod>()

  const handlePeriod = (newPeriod: iPeriod) => setPeriodData(newPeriod)

  const getPeriod = useCallback((query: string) => {
    setIsLoading(true)
    apiCalendar
      .listPeriod(query)
      .then((res) => {
        setListData(res.result)
        setCount(res.total)
      })
      .finally(() => setIsLoading(false))
  }, [])

  const define_query = useCallback((comp: string) => {
    return `?category=ANO${comp}`
  }, [])

  const getData = () => getPeriod(define_query(''))

  useEffect(() => {
    let query_data = ''
    if (search) {
      query_data += `&name=${search}`
      debounce(() => {
        getPeriod(define_query(query_data))
      })
    } else getPeriod(define_query(query_data))
  }, [debounce, define_query, getPeriod, search])

  return (
    <>
      <TablePeriodPage listData={listData} handlePeriod={handlePeriod} />
      <DialogCreateYearPeriod getData={getData} />
      {periodData && <DialogEditPeriod period={periodData} getData={getData} />}
    </>
  )
}
