import { useCallback, useEffect, useMemo, useState } from 'react'
import { usePaginationContext } from '../../../shared/contexts'
import { useDebounce } from '../../../shared/hooks'
import { iClass } from '../../../shared/interfaces'
import sortArray from 'sort-array'
import { apiClass } from '../../../shared/services'
import { TableClass } from '../components'

export const ViewClass = () => {
  const { debounce } = useDebounce()
  const { setCount, setIsLoading, query, order, by, search } =
    usePaginationContext()
  const [data, setData] = useState<iClass[]>([])

  const getClasses = useCallback((query: string) => {
    setIsLoading(true)
    apiClass
      .list(query)
      .then((res) => {
        setData(res.result)
        setCount(res.total)
      })
      .finally(() => setIsLoading(false))
  }, [])

  const define_query = useCallback(
    (comp: string) => {
      return query() + comp + '&order=name'
    },
    [query],
  )

  useEffect(() => {
    let query_data = ''
    if (search) {
      query_data += `&name=${search}`
      debounce(() => {
        getClasses(define_query(query_data))
      })
    } else getClasses(define_query(query_data))
  }, [define_query, search])

  const table = useMemo(() => {
    const classes = sortArray<iClass>(data, { by: order, order: by })

    return <TableClass data={classes} />
  }, [by, data, order])

  return table
}
