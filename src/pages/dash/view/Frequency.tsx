import { z } from 'zod'
import { Checklist } from '@mui/icons-material'
import { Box, Chip } from '@mui/material'
import { SyntheticEvent, useCallback, useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import {
  useDebounce,
  usePaginationContext,
  LayoutBasePage,
  TitleSchoolDashViewPage,
  Tools,
  Footer,
  useCalendarContext,
  apiFrequency,
  iFrequency,
  PaginationTable,
  TabsFrequencyPage,
  TabsMonth,
} from '../../../shared'
import { TableDashboardSchoolFrequencyPage } from '../components'

interface iViewDashboardSchoolFrequencyPageProps {
  year_id?: string
}

export const ViewDashboardSchoolFrequencyPage = ({
  year_id,
}: iViewDashboardSchoolFrequencyPageProps) => {
  const { school_id } = useParams()
  const { debounce } = useDebounce()
  const [searchParams] = useSearchParams()
  const date = searchParams.get('date') || undefined
  const { handleListMonth, listMonth } = useCalendarContext()
  const {
    setCount,
    setIsLoading,
    search,
    setFace,
    query_page,
    handleFace,
    face,
  } = usePaginationContext()
  const [listData, setListData] = useState<iFrequency[]>([])
  const [index, setIndex] = useState(0)

  const handleChange = (_event: SyntheticEvent, newValue: number | string) =>
    setIndex(Number(newValue))

  const getFrequency = useCallback((query: string, isFace?: boolean) => {
    setIsLoading(true)
    if (isFace) {
      apiFrequency
        .list(query)
        .then((res) => setListData((old) => old?.concat(res.result)))
        .finally(() => setIsLoading(false))
    } else {
      apiFrequency
        .list(query)
        .then((res) => {
          setFace(1)
          setListData(res.result)
          handleListMonth(res.months)
          setCount(res.total)
        })
        .finally(() => setIsLoading(false))
    }
  }, [])

  const define_query = useCallback(
    (comp: string) => {
      const query = `?school_id=${school_id}${comp}${query_page()}`
      if (year_id) {
        switch (year_id) {
          case 'none':
            return `${query}&is_active=false`

          case 'day':
            return `${query}&date=${date}`

          default:
            return `${query}&year_id=${year_id}&month_id=${listMonth?.at(index)
              ?.id}`
        }
      }

      return query
    },
    [date, index, query_page, school_id, year_id],
  )

  const onClick = () => getFrequency(define_query(handleFace(face)), true)

  useEffect(() => {
    let query_data = ''
    if (search) {
      query_data += `&name=${search}`
      debounce(() => {
        getFrequency(define_query(query_data))
      })
    } else getFrequency(define_query(query_data))
  }, [define_query, search])

  return (
    <LayoutBasePage
      title={
        <TitleSchoolDashViewPage>
          <Chip
            color="primary"
            label="Frequências"
            icon={<Checklist sx={{ mr: 0.5 }} fontSize="inherit" />}
          />
        </TitleSchoolDashViewPage>
      }
      tools={<Tools isSearch isReset />}
    >
      <TabsFrequencyPage
        date={date}
        value={year_id}
        href={`/${school_id}/frequency`}
        isSchool
      />
      <Box display="flex" justifyContent="space-between">
        {year_id && z.string().uuid().safeParse(year_id).success && (
          <TabsMonth value={index} handleChange={handleChange} />
        )}
        <Box flex={1}>
          <TableDashboardSchoolFrequencyPage
            listData={listData}
            message={
              year_id === 'none'
                ? 'Nenhuma frequência pendente'
                : 'Nenhuma frequência realizada'
            }
          />
        </Box>
      </Box>
      <PaginationTable
        total={listData ? listData.length : 0}
        onClick={onClick}
      />
      <Footer />
    </LayoutBasePage>
  )
}
