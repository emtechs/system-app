import sortArray from 'sort-array'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  useDebounce,
  useParamsContext,
  usePaginationContext,
  iStudent,
  apiStudent,
  PaginationTable,
} from '../../../shared'
import { TableStudentPage } from '../components'

export const ViewStudentPage = () => {
  const { debounce } = useDebounce()
  const { setIsLoading, order, by, search } = useParamsContext()
  const { setCount, setFace, query_page, handleFace, face } =
    usePaginationContext()
  const [listData, setListData] = useState<iStudent[]>([])

  const getStudents = useCallback((query: string, isFace?: boolean) => {
    setIsLoading(true)
    if (isFace) {
      apiStudent
        .list(query)
        .then((res) => setListData((old) => old?.concat(res.result)))
        .finally(() => setIsLoading(false))
    } else {
      apiStudent
        .list(query)
        .then((res) => {
          setFace(1)
          setListData(res.result)
          setCount(res.total)
        })
        .finally(() => setIsLoading(false))
    }
  }, [])

  const define_query = useCallback(
    (comp: string) => {
      return '?by=asc' + comp + query_page()
    },
    [query_page],
  )

  const onClick = () => getStudents(define_query(handleFace(face)), true)

  useEffect(() => {
    let query_data = ''
    if (search) {
      query_data += `&name=${search}`
      debounce(() => {
        getStudents(define_query(query_data))
      })
    } else getStudents(define_query(query_data))
  }, [define_query, search])

  const data = useMemo(() => {
    return sortArray<iStudent>(listData, { by: order, order: by })
  }, [by, listData, order])

  return (
    <>
      <TableStudentPage data={data} />
      <PaginationTable
        total={listData ? listData.length : 0}
        onClick={onClick}
      />
    </>
  )
}
