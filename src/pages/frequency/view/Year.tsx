import { Checklist } from '@mui/icons-material'
import { Box } from '@mui/material'
import {
  LayoutBasePage,
  Tools,
  Footer,
  PaginationTable,
  apiFrequency,
  iFrequencyBase,
  useDebounce,
  usePaginationContext,
  LabelYear,
  LinkChip,
  TitleBaseItemsPage,
  TabsMonth,
  useCalendarContext,
} from '../../../shared'
import { TableFrequencyPage, TabsFrequencyPage } from '../components'
import { useState, useCallback, useEffect, SyntheticEvent } from 'react'

interface iViewFrequencyYearPageProps {
  year_id: string
}

export const ViewFrequencyYearPage = ({
  year_id,
}: iViewFrequencyYearPageProps) => {
  const { debounce } = useDebounce()
  const { setListMonth, listMonth } = useCalendarContext()
  const {
    setCount,
    setIsLoading,
    search,
    setFace,
    query_page,
    handleFace,
    face,
  } = usePaginationContext()

  const [listData, setListData] = useState<iFrequencyBase[]>([])
  const [frequencyData, setFrequencyData] = useState<iFrequencyBase>()
  const [index, setIndex] = useState(0)

  const handleChange = (_event: SyntheticEvent, newValue: number | string) =>
    setIndex(Number(newValue))

  const handleFrequency = (newFrequency: iFrequencyBase) =>
    setFrequencyData(newFrequency)

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
          setListMonth(res.months)
          setCount(res.total)
        })
        .finally(() => setIsLoading(false))
    }
  }, [])

  const define_query = useCallback(
    (comp: string) => {
      return (
        `?year_id=${year_id}&month_id=${listMonth[index].id}` +
        comp +
        query_page()
      )
    },
    [query_page, year_id],
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
        <TitleBaseItemsPage>
          <LinkChip
            label="Frequências"
            icon={<Checklist sx={{ mr: 0.5 }} fontSize="inherit" />}
            to="/frequency"
          />
          <LabelYear />
        </TitleBaseItemsPage>
      }
      tools={<Tools isHome isSearch isReset />}
    >
      <TabsFrequencyPage value={year_id} />
      <Box display="flex" justifyContent="space-between">
        <TabsMonth value={index} handleChange={handleChange} />
        <Box flex={1}>
          <TableFrequencyPage
            listData={listData}
            handleFrequency={handleFrequency}
          />
        </Box>
      </Box>
      <PaginationTable
        total={listData ? listData.length : 0}
        onClick={onClick}
      />
      {frequencyData && <></>}
      <Footer />
    </LayoutBasePage>
  )
}
