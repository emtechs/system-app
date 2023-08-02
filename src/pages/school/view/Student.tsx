import sortArray from 'sort-array'
import { Box, Chip } from '@mui/material'
import { useParams } from 'react-router-dom'
import { Groups } from '@mui/icons-material'
import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  useDebounce,
  usePaginationContext,
  iStudent,
  apiStudent,
  LayoutBasePage,
  TitleBaseItemsPage,
  LabelSchool,
  Tools,
  TabsSchoolRetrievePage,
  TabsYear,
  PaginationTable,
  Footer,
  DialogCreateStudentSchool,
  DialogRemoveStudent,
  DialogTransferStudent,
  useCalendarContext,
} from '../../../shared'
import { TableSchoolStudentPage } from '../components'

export const ViewSchoolStudentPage = () => {
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
  const [studentData, setStudentData] = useState<iStudent>()

  const handleStudent = (newStudent: iStudent) => setStudentData(newStudent)

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

  const list = () => getStudent(define_query(`&name=${search}`))

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
    <>
      <LayoutBasePage
        title={
          <TitleBaseItemsPage>
            <LabelSchool clickable />
            <Chip
              color="primary"
              label="Alunos"
              icon={<Groups sx={{ mr: 0.5 }} fontSize="inherit" />}
            />
          </TitleBaseItemsPage>
        }
        tools={
          <Tools
            back="/school"
            isNew
            titleNew="Aluno"
            isDash
            isSearch
            isReset
          />
        }
      >
        <TabsSchoolRetrievePage value="student" />
        <Box display="flex" justifyContent="space-between">
          <TabsYear value={index} handleChange={handleChange} />
          <Box flex={1}>
            <TableSchoolStudentPage data={data} handleStudent={handleStudent} />
            <PaginationTable
              total={listData ? listData.length : 0}
              onClick={onClick}
            />
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
