import sortArray from 'sort-array'
import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { Box } from '@mui/material'
import {
  useDebounce,
  useCalendarContext,
  usePaginationContext,
  iFrequency,
  apiFrequency,
  useParamsContext,
} from '../../shared'
import { PaginationTable, TabsYear } from '../components'
import { TableFrequencySchool, TableFrequencyUser } from './tables'

interface iViewFrequency {
  school_id?: string
  user_id?: string
  table_def: 'user' | 'school'
}

export const ViewFrequency = ({
  school_id,
  user_id,
  table_def,
}: iViewFrequency) => {
  const { debounce } = useDebounce()
  const { listYear } = useCalendarContext()
  const { setIsLoading, query, order, by, search } = useParamsContext()
  const { setCount, setFace, face, handleFace, query_page } =
    usePaginationContext()
  const [data, setData] = useState<iFrequency[]>()
  const [index, setIndex] = useState(0)

  const year_id = listYear[index].id

  const handleChange = (_event: SyntheticEvent, newValue: string | number) => {
    setIndex(Number(newValue))
  }

  const getFrequencies = useCallback((query: string, isPage?: boolean) => {
    setIsLoading(true)
    if (isPage) {
      apiFrequency
        .list(query)
        .then((res) => setData((old) => old?.concat(res.result)))
        .finally(() => setIsLoading(false))
    } else {
      apiFrequency
        .list(query)
        .then((res) => {
          setFace(1)
          setData(res.result)
          setCount(res.total)
        })
        .finally(() => setIsLoading(false))
    }
  }, [])

  const define_query = useCallback(
    (comp: string) => {
      let query_data =
        query(year_id, school_id) + comp + '&order=date' + query_page()
      if (user_id) query_data += `&user_id=${user_id}`
      return query_data
    },
    [query, query_page, school_id, user_id, year_id],
  )

  const onClick = () => getFrequencies(define_query(handleFace(face)), true)

  useEffect(() => {
    let query_data = ''
    if (search) {
      query_data += `&name=${search}`
      debounce(() => {
        getFrequencies(define_query(query_data))
      })
    } else getFrequencies(define_query(query_data))
  }, [define_query, search])

  const table = useMemo(() => {
    let frequencies: iFrequency[]
    if (data) {
      frequencies = sortArray<iFrequency>(data, { by: order, order: by })
      if (order === 'class_name')
        frequencies = sortArray<iFrequency>(data, {
          by: order,
          order: by,
          computed: { class_name: (row) => row.class.name },
        })

      switch (table_def) {
        case 'school':
          return <TableFrequencySchool data={frequencies} />

        case 'user':
          return <TableFrequencyUser data={frequencies} />
      }
    }
    return <></>
  }, [by, data, order, table_def])

  return (
    <Box display="flex" justifyContent="space-between">
      <TabsYear value={index} handleChange={handleChange} />
      <Box flex={1}>
        {table}
        <PaginationTable total={data ? data.length : 0} onClick={onClick} />
      </Box>
    </Box>
  )
}
