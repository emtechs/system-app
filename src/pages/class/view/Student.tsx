import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  DialogCreateStudentSchool,
  DialogRemoveStudent,
  DialogTransferStudent,
  Footer,
  LabelClass,
  LabelSchool,
  TabsSchoolRetrievePage,
  TitleBaseItemsPage,
  ToolsSchool,
} from '../../../shared/components'
import { iStudent } from '../../../shared/interfaces'
import { apiStudent } from '../../../shared/services'
import {
  usePaginationContext,
  useSchoolContext,
} from '../../../shared/contexts'
import sortArray from 'sort-array'
import { useDebounce } from '../../../shared/hooks'
import { useParams } from 'react-router-dom'
import { LayoutBasePage } from '../../../shared/layouts'
import { TableClassStudentPage } from '../components'

export const ViewClassStudentPage = () => {
  const { key } = useParams()
  const { debounce } = useDebounce()
  const { schoolSelect } = useSchoolContext()
  const { setCount, setIsLoading, search, order, by } = usePaginationContext()
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
        tools={
          <ToolsSchool back="/school" isNew titleNew="Aluno" isDash isSearch />
        }
      >
        <TabsSchoolRetrievePage value="student" />
        <TableClassStudentPage data={data} handleStudent={handleStudent} />
        <Footer />
      </LayoutBasePage>
      {schoolSelect && (
        <DialogCreateStudentSchool id={schoolSelect.id} list={list} />
      )}
      {studentData && <DialogRemoveStudent student={studentData} list={list} />}
      {studentData && (
        <DialogTransferStudent student={studentData} list={list} />
      )}
    </>
  )
}
