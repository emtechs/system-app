import { Groups } from '@mui/icons-material'
import { Chip } from '@mui/material'
import { useState, useCallback, useEffect, useMemo } from 'react'
import {
  useDebounce,
  useAuthContext,
  usePaginationContext,
  apiStudent,
  LayoutBasePage,
  Tools,
  PaginationTable,
  Footer,
  useParamsContext,
  TitleBasePage,
  iStudentResume,
} from '../../../shared'
import { TabsStudentPage, TableStudentAbsencesPage } from '../components'

export const ViewStudentAbsencesPage = () => {
  const { debounce } = useDebounce()
  const { yearData } = useAuthContext()
  const { setIsLoading, search } = useParamsContext()
  const { setCount, setFace, query_page, handleFace, face } =
    usePaginationContext()
  const [listData, setListData] = useState<iStudentResume[]>([])

  const year_id_data = useMemo(() => {
    if (yearData) return yearData.id
    return ''
  }, [yearData])

  const getStudent = useCallback(
    (year_id: string, query: string, isFace?: boolean) => {
      setIsLoading(true)
      if (isFace) {
        apiStudent
          .resume(year_id, query)
          .then((res) => setListData((old) => old?.concat(res.result)))
          .finally(() => setIsLoading(false))
      } else {
        apiStudent
          .resume(year_id, query)
          .then((res) => {
            setFace(1)
            setListData(res.result)
            setCount(res.total)
          })
          .finally(() => setIsLoading(false))
      }
    },
    [],
  )

  const define_query = useCallback(
    (comp: string) => {
      return `?by=asc${comp}${query_page()}`
    },
    [query_page],
  )

  const onClick = () =>
    getStudent(year_id_data, define_query(handleFace(face)), true)

  useEffect(() => {
    let query_data = ''
    if (search) {
      query_data += `&name=${search}`
      debounce(() => {
        getStudent(year_id_data, define_query(query_data))
      })
    } else getStudent(year_id_data, define_query(query_data))
  }, [define_query, search, year_id_data])

  return (
    <LayoutBasePage
      title={
        <TitleBasePage>
          <Chip
            label="Alunos"
            color="primary"
            icon={<Groups sx={{ mr: 0.5 }} fontSize="inherit" />}
          />
        </TitleBasePage>
      }
      tools={<Tools isHome isSearch isReset />}
    >
      <TabsStudentPage value="absences" />
      <TableStudentAbsencesPage listData={listData} />
      <PaginationTable
        total={listData ? listData.length : 0}
        onClick={onClick}
      />
      <Footer />
    </LayoutBasePage>
  )
}
