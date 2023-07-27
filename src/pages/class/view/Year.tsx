import { useParams } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import { iClass } from '../../../shared/interfaces'
import { apiClass } from '../../../shared/services'
import { usePaginationContext } from '../../../shared/contexts'
import { TableClassYearPage } from '../components'
import { useDebounce } from '../../../shared/hooks'
import { PaginationTable } from '../../../shared/components'

export const ViewClassYearPage = () => {
  const { year_id } = useParams()
  const { debounce } = useDebounce()
  const {
    setCount,
    setIsLoading,
    search,
    setFace,
    handleFace,
    face,
    query_page,
  } = usePaginationContext()
  const [listData, setListData] = useState<iClass[]>([])

  const getClass = useCallback((query: string, isFace?: boolean) => {
    setIsLoading(true)
    if (isFace) {
      apiClass
        .listClass(query)
        .then((res) => setListData((old) => old?.concat(res.result)))
        .finally(() => setIsLoading(false))
    } else {
      apiClass
        .listClass(query)
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
      return `?year_id=${year_id}${comp}${query_page()}`
    },
    [query_page, year_id],
  )

  const onClick = () => getClass(define_query(handleFace(face)), true)

  useEffect(() => {
    let query_data = ''
    if (search) {
      query_data += `&name=${search}`
      debounce(() => {
        getClass(define_query(query_data))
      })
    } else getClass(define_query(query_data))
  }, [define_query, search])

  return (
    <>
      <TableClassYearPage listData={listData} />
      <PaginationTable
        total={listData ? listData.length : 0}
        onClick={onClick}
      />
    </>
  )
}
