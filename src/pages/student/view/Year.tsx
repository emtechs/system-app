import { Groups } from '@mui/icons-material'
import { useState, useCallback, useEffect } from 'react'
import {
  useDebounce,
  usePaginationContext,
  iStudent,
  apiStudent,
  LayoutBasePage,
  TitleBaseItemsPage,
  LinkChip,
  LabelYear,
  Tools,
  PaginationTable,
  DialogRemoveStudent,
  DialogTransferStudent,
  Footer,
  useParamsContext,
} from '../../../shared'
import { TabsStudentPage, TableStudentYearPage } from '../components'

interface iViewStudentYearPageProps {
  year_id: string
}

export const ViewStudentYearPage = ({ year_id }: iViewStudentYearPageProps) => {
  const { debounce } = useDebounce()
  const { setIsLoading, search } = useParamsContext()
  const { setCount, setFace, query_page, handleFace, face } =
    usePaginationContext()
  const [listData, setListData] = useState<iStudent[]>([])
  const [studentData, setStudentData] = useState<iStudent>()

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
      return `?year_id=${year_id}${comp}${query_page()}`
    },
    [query_page, year_id],
  )

  const onClick = () => getStudent(define_query(handleFace(face)), true)

  const handleStudent = (newStudent: iStudent) => setStudentData(newStudent)

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

  return (
    <LayoutBasePage
      title={
        <TitleBaseItemsPage>
          <LinkChip
            label="Alunos"
            icon={<Groups sx={{ mr: 0.5 }} fontSize="inherit" />}
            to="/student"
          />
          <LabelYear />
        </TitleBaseItemsPage>
      }
      tools={<Tools isHome isSearch isNew titleNew="Nova" isReset />}
    >
      <TabsStudentPage value={year_id} />
      <TableStudentYearPage listData={listData} handleStudent={handleStudent} />
      <PaginationTable
        total={listData ? listData.length : 0}
        onClick={onClick}
      />
      {studentData && <DialogRemoveStudent student={studentData} list={list} />}
      {studentData && (
        <DialogTransferStudent student={studentData} list={list} />
      )}
      <Footer />
    </LayoutBasePage>
  )
}
