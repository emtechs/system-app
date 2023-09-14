import sortArray from 'sort-array'
import { Box } from '@mui/material'
import { useParams } from 'react-router-dom'
import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  useDebounce,
  useCalendarContext,
  usePaginationContext,
  iStudent,
  apiStudent,
  TabsYear,
  PaginationTable,
} from '../../../../../shared'
import { TableDashboardSchoolStudentAllPage } from '../../../components'

export const ViewDashboardSchoolStudentAllPage = () => {
  const { school_id } = useParams()
  const { debounce } = useDebounce()
  const { listYear } = useCalendarContext()
  const {
    setCount,
    setIsLoading,
    search,
    order,
    by,
    setFace,
    query_page,
    handleFace,
    face,
  } = usePaginationContext()
  const [listData, setListData] = useState<iStudent[]>([])
  const [index, setIndex] = useState(0)

  const handleChange = (_event: SyntheticEvent, newValue: string | number) => {
    setIndex(Number(newValue))
  }

  const getStudent = useCallback((query: string, isFace?: boolean) => {
    setIsLoading(true)
    if (isFace) {
      apiStudent
        .listClass(query)
        .then((res) => setListData((old) => old?.concat(res.result)))
        .finally(() => setIsLoading(false))
    } else {
      apiStudent
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
      return `?school_id=${school_id}&year_id=${
        listYear[index].id
      }${comp}${query_page()}`
    },
    [index, listYear, query_page, school_id],
  )

  const onClick = () => getStudent(define_query(handleFace(face)), true)

  useEffect(() => {
    let query_data = ''
    if (search) {
      query_data += `&name=${search}`
      debounce(() => {
        getStudent(define_query(query_data))
      })
    } else getStudent(define_query(query_data))
  }, [define_query, search])

  const data = useMemo(() => {
    let listStundet: iStudent[]

    if (order === 'class_name')
      listStundet = sortArray<iStudent>(listData, {
        by: order,
        order: by,
        computed: { class_name: (row) => row.class.name },
      })

    listStundet = sortArray<iStudent>(listData, {
      by: order,
      order: by,
    })

    return listStundet
  }, [by, listData, order])

  return (
    <Box display="flex" justifyContent="space-between">
      <TabsYear value={index} handleChange={handleChange} />
      <Box flex={1}>
        <TableDashboardSchoolStudentAllPage data={data} />
        <PaginationTable
          total={listData ? listData.length : 0}
          onClick={onClick}
        />
      </Box>
    </Box>
  )
}
