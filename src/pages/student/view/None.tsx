import { Close, Groups } from '@mui/icons-material'
import { Chip } from '@mui/material'
import { useState, useCallback, useEffect } from 'react'
import {
  useDebounce,
  useAuthContext,
  usePaginationContext,
  iStudent,
  apiStudent,
  LayoutBasePage,
  TitleBaseItemsPage,
  LinkChip,
  Tools,
  PaginationTable,
  DialogGroupStudent,
  Footer,
  useParamsContext,
} from '../../../shared'
import { TabsStudentPage, TableStudentNonePage } from '../components'

export const ViewStudentNonePage = () => {
  const { debounce } = useDebounce()
  const { yearData } = useAuthContext()
  const { setIsLoading, search } = useParamsContext()
  const { setCount, setFace, query_page, handleFace, face } =
    usePaginationContext()
  const [listData, setListData] = useState<iStudent[]>([])
  const [studentData, setStudentData] = useState<iStudent>()

  const getStudents = useCallback((query: string, isFace?: boolean) => {
    setIsLoading(true)
    if (isFace) {
      apiStudent
        .list(query)
        .then((res) => setListData((old) => old?.concat(res.result)))
        .finally(() => setIsLoading(false))
    } else {
      apiStudent
        .list(query)
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
      return `?year_id=${yearData?.id}${comp}${query_page()}`
    },
    [query_page, yearData],
  )

  const onClick = () => getStudents(define_query(handleFace(face)), true)

  const handleStudent = (newStudent: iStudent) => setStudentData(newStudent)

  const list = () => getStudents(define_query(`&name=${search}`))

  useEffect(() => {
    let query_data = ''
    if (search) {
      query_data += `&name=${search}`
      debounce(() => {
        getStudents(define_query(query_data))
      })
    } else getStudents(define_query(query_data))
  }, [define_query, search])

  return (
    <LayoutBasePage
      title={
        <TitleBaseItemsPage>
          <LinkChip
            label="Alunos"
            icon={<Groups sx={{ mr: 0.5 }} fontSize="inherit" />}
            to="/student"
          />
          <Chip
            color="primary"
            label="Não Enturmados"
            icon={<Close sx={{ mr: 0.5 }} fontSize="inherit" />}
          />
        </TitleBaseItemsPage>
      }
      tools={<Tools isHome isSearch isNew titleNew="Nova" isReset />}
    >
      <TabsStudentPage value="none" />
      <TableStudentNonePage listData={listData} handleStudent={handleStudent} />
      <PaginationTable
        total={listData ? listData.length : 0}
        onClick={onClick}
      />
      {studentData && <DialogGroupStudent student={studentData} list={list} />}
      <Footer />
    </LayoutBasePage>
  )
}
