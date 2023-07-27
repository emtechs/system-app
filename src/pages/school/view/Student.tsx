import { Groups } from '@mui/icons-material'
import { Box, Chip } from '@mui/material'
import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  TitleSchoolViewPage,
  ToolsSchool,
  TabsSchoolRetrievePage,
  Footer,
  TabsYear,
  DialogCreateStudentSchool,
  DialogRemoveStudent,
  DialogTransferStudent,
} from '../../../shared/components'
import { LayoutBasePage } from '../../../shared/layouts'
import { TableSchoolStudentPage } from '../components'
import { iStudent } from '../../../shared/interfaces'
import { apiStudent } from '../../../shared/services'
import { useAuthContext, usePaginationContext } from '../../../shared/contexts'
import { useParams } from 'react-router-dom'
import sortArray from 'sort-array'
import { useDebounce } from '../../../shared/hooks'

export const ViewSchoolStudentPage = () => {
  const { school_id } = useParams()
  const { debounce } = useDebounce()
  const { listYear } = useAuthContext()
  const { setCount, setIsLoading, search, order, by } = usePaginationContext()
  const [listData, setListData] = useState<iStudent[]>([])
  const [index, setIndex] = useState(0)
  const [studentData, setStudentData] = useState<iStudent>()

  const handleStudent = (newStudent: iStudent) => setStudentData(newStudent)

  const handleChange = (_event: SyntheticEvent, newValue: string | number) => {
    setIndex(Number(newValue))
  }

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

  const list = () => getStudent(queryData)

  useEffect(() => {
    let query_data = queryData
    if (search) {
      query_data += `&name=${search}`
      debounce(() => {
        getStudent(query_data)
      })
    } else getStudent(query_data)
  }, [queryData, search])

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
    <>
      <LayoutBasePage
        title={
          <TitleSchoolViewPage>
            <Chip
              color="primary"
              label="Alunos"
              icon={<Groups sx={{ mr: 0.5 }} fontSize="inherit" />}
            />
          </TitleSchoolViewPage>
        }
        tools={
          <ToolsSchool back="/school" isNew titleNew="Aluno" isDash isSearch />
        }
      >
        <TabsSchoolRetrievePage value="student" />
        <Box display="flex" justifyContent="space-between">
          <TabsYear value={index} handleChange={handleChange} />
          <Box flex={1}>
            <TableSchoolStudentPage data={data} handleStudent={handleStudent} />
          </Box>
        </Box>
        <Footer />
      </LayoutBasePage>
      {school_id && <DialogCreateStudentSchool id={school_id} list={list} />}
      {studentData && <DialogRemoveStudent student={studentData} list={list} />}
      {studentData && (
        <DialogTransferStudent student={studentData} list={list} />
      )}
    </>
  )
}
