import sortArray from 'sort-array'
import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { Box } from '@mui/material'
import { useParams } from 'react-router-dom'
import {
  useDebounce,
  useCalendarContext,
  usePaginationContext,
  useParamsContext,
  iSchoolClass,
  apiSchoolRetrieve,
  TabsYear,
} from '../../../shared'
import { TableClassSchool } from './tables'

export const ViewDashSchoolClass = () => {
  const { school_id } = useParams()
  const { debounce } = useDebounce()
  const { listYear } = useCalendarContext()
  const { setCount } = usePaginationContext()
  const { search, order, by, setIsLoading } = useParamsContext()
  const [listData, setListData] = useState<iSchoolClass[]>([])
  const [index, setIndex] = useState(0)

  const handleChange = (_event: SyntheticEvent, newValue: string | number) => {
    setIndex(Number(newValue))
  }

  const getClass = useCallback(
    (query: string) => {
      if (school_id) {
        setIsLoading(true)
        apiSchoolRetrieve
          .classData(school_id, query)
          .then((res) => {
            setListData(res.result)
            setCount(res.total)
          })
          .finally(() => setIsLoading(false))
      }
    },
    [school_id],
  )

  const queryData = useMemo(() => {
    return `&year_id=${listYear[index].id}`
  }, [index, listYear])

  useEffect(() => {
    let query_data = queryData
    if (search) {
      query_data += `&name=${search}`
      debounce(() => {
        getClass(query_data)
      })
    } else getClass(query_data)
  }, [queryData, search])

  const table = useMemo(() => {
    const listClass = sortArray<iSchoolClass>(listData, {
      by: order,
      order: by,
    })

    return <TableClassSchool data={listClass} />
  }, [by, listData, order])

  return (
    <Box display="flex" justifyContent="space-between">
      <TabsYear value={index} handleChange={handleChange} />
      <Box flex={1}>{table}</Box>
    </Box>
  )
}
