import { Box } from '@mui/material'
import {
  useState,
  SyntheticEvent,
  useCallback,
  useMemo,
  useEffect,
} from 'react'
import { useParams } from 'react-router-dom'
import sortArray from 'sort-array'
import {
  useDebounce,
  useCalendarContext,
  usePaginationContext,
  useParamsContext,
  iStudent,
  apiStudent,
  TabsYear,
  DialogCreateStudentSchool,
  DialogRemoveStudent,
  DialogTransferStudent,
} from '../../../shared'
import { TableStudentSchool } from '../tables'

export const ViewSchoolStudent = () => {
  const { school_id } = useParams()
  const { debounce } = useDebounce()
  const { listYear } = useCalendarContext()
  const { setCount } = usePaginationContext()
  const { search, order, by, setIsLoading } = useParamsContext()
  const [listData, setListData] = useState<iStudent[]>([])
  const [index, setIndex] = useState(0)
  const [studentData, setStudentData] = useState<iStudent>()

  const handleStudent = (newStudent: iStudent) => setStudentData(newStudent)

  const handleChange = (_event: SyntheticEvent, newValue: string | number) =>
    setIndex(Number(newValue))

  const getStudent = useCallback((query: string) => {
    setIsLoading(true)
    apiStudent
      .listClass(query)
      .then((res) => {
        setListData(res.result)
        setCount(res.total)
      })
      .finally(() => setIsLoading(false))
  }, [])

  const queryData = useMemo(() => {
    return `?school_id=${school_id}&year_id=${listYear[index].id}`
  }, [index, listYear, school_id])

  useEffect(() => {
    let query_data = queryData
    if (search) {
      query_data += `&name=${search}`
      debounce(() => {
        getStudent(query_data)
      })
    } else getStudent(query_data)
  }, [queryData, search])

  const list = () => getStudent(queryData)

  const table = useMemo(() => {
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

    return (
      <TableStudentSchool data={listStundet} handleStudent={handleStudent} />
    )
  }, [by, listData, order])

  return (
    <>
      {school_id ? (
        <Box display="flex" justifyContent="space-between">
          <TabsYear value={index} handleChange={handleChange} />
          <Box flex={1}>{table}</Box>
        </Box>
      ) : (
        table
      )}

      {school_id && <DialogCreateStudentSchool id={school_id} list={list} />}
      {studentData && <DialogRemoveStudent student={studentData} list={list} />}
      {studentData && (
        <DialogTransferStudent student={studentData} list={list} />
      )}
    </>
  )
}
