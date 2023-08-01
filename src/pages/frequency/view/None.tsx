import { useState, useCallback, useEffect } from 'react'
import { Checklist, Close } from '@mui/icons-material'
import { Chip } from '@mui/material'
import {
  LayoutBasePage,
  Tools,
  Footer,
  PaginationTable,
  apiFrequency,
  iFrequencyBase,
  useDebounce,
  usePaginationContext,
  LinkChip,
  TitleBaseItemsPage,
} from '../../../shared'
import { TableFrequencyPage, TabsFrequencyPage } from '../components'

interface iViewFrequencyNonePageProps {
  year_id: string
}

export const ViewFrequencyNonePage = ({
  year_id,
}: iViewFrequencyNonePageProps) => {
  const { debounce } = useDebounce()
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
          setCount(res.total)
        })
        .finally(() => setIsLoading(false))
    }
  }, [])

  const define_query = useCallback(
    (comp: string) => {
      return '?is_active=false' + comp + query_page()
    },
    [query_page],
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
          <Chip
            label="Em Aberto"
            color="primary"
            icon={<Close sx={{ mr: 0.5 }} fontSize="inherit" />}
          />
        </TitleBaseItemsPage>
      }
      tools={<Tools isHome isSearch isReset />}
    >
      <TabsFrequencyPage value={year_id} />
      <TableFrequencyPage
        listData={listData}
        handleFrequency={handleFrequency}
      />
      <PaginationTable
        total={listData ? listData.length : 0}
        onClick={onClick}
      />
      {frequencyData && <></>}
      <Footer />
    </LayoutBasePage>
  )
}
