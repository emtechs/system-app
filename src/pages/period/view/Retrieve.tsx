import { useCallback, useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import {
  useDebounce,
  usePaginationContext,
  iPeriod,
  apiCalendar,
  useCalendarContext,
  useParamsContext,
} from '../../../shared'
import {
  DialogCreatePeriod,
  DialogEditPeriod,
  TableRetrievePeriodPage,
} from '../components'

export const ViewRetrievePeriodPage = () => {
  const { year_id } = useParams()
  const [searchParams] = useSearchParams()
  const view = searchParams.get('view') || 'BIMESTRE'
  const { debounce } = useDebounce()
  const { yearSelect } = useCalendarContext()
  const { setCount } = usePaginationContext()
  const { search, setIsLoading } = useParamsContext()
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

  const define_query = useCallback(
    (comp: string) => {
      return `?year_id=${year_id}&category=${view}${comp}`
    },
    [view, year_id],
  )

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
      <TableRetrievePeriodPage
        listData={listData}
        handlePeriod={handlePeriod}
      />
      {yearSelect && (
        <DialogCreatePeriod getData={getData} view={view} year={yearSelect} />
      )}
      {periodData && <DialogEditPeriod period={periodData} getData={getData} />}
    </>
  )
}
