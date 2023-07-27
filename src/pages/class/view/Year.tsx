import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  DialogRemoveStudent,
  DialogTransferStudent,
  PaginationTable,
} from '../../../shared/components'
import { iStudent } from '../../../shared/interfaces'
import { apiStudent } from '../../../shared/services'
import { usePaginationContext } from '../../../shared/contexts'
import { TableClassYearPage } from '../components'
import sortArray from 'sort-array'
import { useDebounce } from '../../../shared/hooks'
import { useParams } from 'react-router-dom'

export const ViewClassYearPage = () => {
  const { year_id } = useParams()
  const { debounce } = useDebounce()
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

  const data = useMemo(() => {
    let listStundet: iStudent[]

    if (order === 'school_name')
      listStundet = sortArray<iStudent>(listData, {
        by: order,
        order: by,
        computed: { school_name: (row) => row.school.name },
      })

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
      <TableClassYearPage data={data} handleStudent={handleStudent} />
      <PaginationTable
        total={listData ? listData.length : 0}
        onClick={onClick}
      />
      {studentData && <DialogRemoveStudent student={studentData} list={list} />}
      {studentData && (
        <DialogTransferStudent student={studentData} list={list} />
      )}
    </>
  )
}
