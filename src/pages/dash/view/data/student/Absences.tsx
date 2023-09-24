import sortArray from 'sort-array'
import { useParams } from 'react-router-dom'
import { useState, useCallback, useEffect, useMemo } from 'react'
import {
  apiSchool,
  iStudentResume,
  useAuthContext,
  useDebounce,
  usePaginationContext,
  useParamsContext,
} from '../../../../../shared'
import { TableDashboardSchoolStudentAbsencesPage } from '../../../components'

export const ViewDashboardSchoolStudentAbsencesPage = () => {
  const { school_id } = useParams()
  const { debounce } = useDebounce()
  const { yearData } = useAuthContext()
  const { setCount } = usePaginationContext()
  const { setIsLoading, search, order, by } = useParamsContext()
  const [listData, setListData] = useState<iStudentResume[]>([])

  const getStudent = useCallback(
    (id: string, year_id: string, query: string) => {
      setIsLoading(true)
      apiSchool
        .resume(id, year_id, query)
        .then((res) => {
          setListData(res.result)
          setCount(res.total)
        })
        .finally(() => setIsLoading(false))
    },
    [],
  )

  useEffect(() => {
    if (school_id && yearData) {
      let query_data = ''
      if (search) {
        query_data += `?name=${search}`
        debounce(() => {
          getStudent(school_id, yearData.id, query_data)
        })
      } else getStudent(school_id, yearData.id, query_data)
    }
  }, [school_id, search, yearData])

  const data = useMemo(() => {
    let listStundet: iStudentResume[]

    if (order === 'class_name')
      listStundet = sortArray<iStudentResume>(listData, {
        by: order,
        order: by,
        computed: { class_name: (row) => row.class.name },
      })

    listStundet = sortArray<iStudentResume>(listData, {
      by: order,
      order: by,
    })

    return listStundet
  }, [by, listData, order])

  return <TableDashboardSchoolStudentAbsencesPage data={data} />
}
