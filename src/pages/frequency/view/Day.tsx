import { Chip } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Checklist, EventAvailable } from '@mui/icons-material'
import {
  usePaginationContext,
  LayoutBasePage,
  Footer,
  useParamsContext,
  LinkChip,
  TitleBaseItemsPage,
  apiFrequency,
  iFrequency,
  useDebounce,
  DialogDeleteFrequency,
  DialogRetrieveFrequency,
  PaginationTable,
  TabsFrequencyPage,
  Tools,
} from '../../../shared'
import { TableFrequencyPage } from '../components'

export const ViewFrequencyDayPage = () => {
  const [searchParams] = useSearchParams()
  const date = searchParams.get('date') || undefined
  const { debounce } = useDebounce()
  const { setIsLoading, search } = useParamsContext()
  const { setCount, setFace, query_page, handleFace, face } =
    usePaginationContext()
  const [listData, setListData] = useState<iFrequency[]>([])
  const [frequencyData, setFrequencyData] = useState<iFrequency>()

  const handleFrequency = (newFrequency: iFrequency) =>
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
          setCount(res.total)
        })
        .finally(() => setIsLoading(false))
    }
  }, [])

  const define_query = useCallback(
    (comp: string) => {
      return `?date=${date}` + comp + query_page()
    },
    [date, query_page],
  )

  const onClick = () => getFrequency(define_query(handleFace(face)), true)

  const list = () => getFrequency(define_query(''))

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
          <Chip
            label={date}
            color="primary"
            icon={<EventAvailable sx={{ mr: 0.5 }} fontSize="inherit" />}
          />
        </TitleBaseItemsPage>
      }
      tools={<Tools isHome isSearch isReset />}
    >
      <TabsFrequencyPage value="day" date={date} />
      <TableFrequencyPage
        listData={listData}
        handleFrequency={handleFrequency}
      />
      <PaginationTable
        total={listData ? listData.length : 0}
        onClick={onClick}
      />
      {frequencyData && (
        <>
          <DialogRetrieveFrequency frequency={frequencyData} getData={list} />
          <DialogDeleteFrequency frequency={frequencyData} getData={list} />
        </>
      )}
      <Footer />
    </LayoutBasePage>
  )
}
