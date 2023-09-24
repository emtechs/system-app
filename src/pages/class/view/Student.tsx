import sortArray from 'sort-array'
import { useParams } from 'react-router-dom'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  useDebounce,
  usePaginationContext,
  iStudent,
  apiStudent,
  LayoutBasePage,
  TitleBaseItemsPage,
  LabelSchool,
  LabelClass,
  Tools,
  Footer,
  DialogRemoveStudent,
  DialogTransferStudent,
  useParamsContext,
} from '../../../shared'
import {
  DialogClassStudentPage,
  TableClassStudentPage,
  TabsClassKeyPage,
} from '../components'

export const ViewClassStudentPage = () => {
  const { view: key } = useParams()
  const { debounce } = useDebounce()
  const { setCount } = usePaginationContext()
  const { setIsLoading, search, order, by } = useParamsContext()
  const [listData, setListData] = useState<iStudent[]>([])
  const [studentData, setStudentData] = useState<iStudent>()

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

  const define_query = useCallback(
    (comp: string) => {
      return `?key_class=${key}${comp}`
    },
    [key],
  )

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

  const data = useMemo(() => {
    let listStundet: iStudent[]

    if (order === 'school_name')
      listStundet = sortArray<iStudent>(listData, {
        by: order,
        order: by,
        computed: { school_name: (row) => row.school.name },
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
            <LabelClass />
          </TitleBaseItemsPage>
        }
        tools={<Tools isBack isNew titleNew="Aluno" isSearch />}
      >
        <TabsClassKeyPage value="student" />
        <TableClassStudentPage data={data} handleStudent={handleStudent} />
        <Footer />
      </LayoutBasePage>
      {key && <DialogClassStudentPage id={key} getData={list} />}
      {studentData && <DialogRemoveStudent student={studentData} list={list} />}
      {studentData && (
        <DialogTransferStudent student={studentData} list={list} />
      )}
    </>
  )
}
