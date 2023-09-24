import sortArray from 'sort-array'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  useDebounce,
  usePaginationContext,
  useParamsContext,
  iSchoolUser,
  apiSchoolRetrieve,
} from '../../../shared'
import { TableUserSchool } from './tables'

export const ViewSchoolServer = () => {
  const { school_id } = useParams()
  const { debounce } = useDebounce()
  const { setCount } = usePaginationContext()
  const { search, order, by, setIsLoading } = useParamsContext()
  const [listData, setListData] = useState<iSchoolUser[]>([])

  const getServer = useCallback(
    (query: string) => {
      if (school_id) {
        setIsLoading(true)
        apiSchoolRetrieve
          .server(school_id, query)
          .then((res) => {
            setListData(res.result)
            setCount(res.total)
          })
          .finally(() => setIsLoading(false))
      }
    },
    [school_id],
  )

  useEffect(() => {
    if (search) {
      const query_data = `&name=${search}`
      debounce(() => {
        getServer(query_data)
      })
    } else getServer('')
  }, [search])

  const table = useMemo(() => {
    const listServer = sortArray<iSchoolUser>(listData, {
      by: order,
      order: by,
    })

    return (
      <TableUserSchool
        data={listServer}
        getServer={getServer}
        school_id={school_id || ''}
      />
    )
  }, [by, getServer, listData, order, school_id])

  return table
}
