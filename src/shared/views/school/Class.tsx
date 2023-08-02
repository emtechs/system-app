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
import { TabsYear } from '../../components'
import { useCalendarContext, usePaginationContext } from '../../contexts'
import { useDebounce } from '../../hooks'
import { iSchoolClass } from '../../interfaces'
import { apiSchoolRetrieve } from '../../services'
import { TableClassSchool } from './tables'

export const ViewSchoolClass = () => {
  const { school_id } = useParams()
  const { debounce } = useDebounce()
  const { listYear } = useCalendarContext()
  const { search, order, by, setCount, setIsLoading } = usePaginationContext()
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
