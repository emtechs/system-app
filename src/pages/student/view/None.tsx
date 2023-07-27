import sortArray from 'sort-array'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAuthContext, usePaginationContext } from '../../../shared/contexts'
import { useDebounce } from '../../../shared/hooks'
import { iStudent } from '../../../shared/interfaces'
import { apiStudent } from '../../../shared/services'
import { DialogGroupStudent, PaginationTable } from '../../../shared/components'
import { TableStudentNonePage } from '../components'

export const ViewStudentNonePage = () => {
  const { debounce } = useDebounce()
  const { yearData } = useAuthContext()
  const {
    setCount,
    setIsLoading,
    order,
    by,
    search,
    setFace,
    query_page,
    handleFace,
    face,
  } = usePaginationContext()
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

  const data = useMemo(() => {
    return sortArray<iStudent>(listData, { by: order, order: by })
  }, [by, listData, order])

  return (
    <>
      <TableStudentNonePage data={data} handleStudent={handleStudent} />
      <PaginationTable
        total={listData ? listData.length : 0}
        onClick={onClick}
      />
      {studentData && <DialogGroupStudent student={studentData} list={list} />}
    </>
  )
}
