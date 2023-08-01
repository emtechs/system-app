import { useState, useCallback, useEffect } from 'react'
import {
  useDebounce,
  usePaginationContext,
  iClass,
  apiClass,
  LayoutBasePage,
  Tools,
  PaginationTable,
  Footer,
  LabelYear,
  LinkChip,
  TitleBaseItemsPage,
} from '../../../shared'
import { TabsClassPage, TableClassYearPage } from '../components'
import { Workspaces } from '@mui/icons-material'

interface iViewClassYearPageProps {
  year_id: string
}

export const ViewClassYearPage = ({ year_id }: iViewClassYearPageProps) => {
  const { debounce } = useDebounce()
  const {
    setCount,
    setIsLoading,
    search,
    setFace,
    handleFace,
    face,
    query_page,
  } = usePaginationContext()
  const [listData, setListData] = useState<iClass[]>([])

  const getClass = useCallback((query: string, isFace?: boolean) => {
    setIsLoading(true)
    if (isFace) {
      apiClass
        .listClass(query)
        .then((res) => setListData((old) => old?.concat(res.result)))
        .finally(() => setIsLoading(false))
    } else {
      apiClass
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

  const onClick = () => getClass(define_query(handleFace(face)), true)

  useEffect(() => {
    let query_data = ''
    if (search) {
      query_data += `&name=${search}`
      debounce(() => {
        getClass(define_query(query_data))
      })
    } else getClass(define_query(query_data))
  }, [define_query, search])

  return (
    <LayoutBasePage
      title={
        <TitleBaseItemsPage>
          <LinkChip
            label="Turmas"
            icon={<Workspaces sx={{ mr: 0.5 }} fontSize="inherit" />}
            to="/class"
          />
          <LabelYear />
        </TitleBaseItemsPage>
      }
      tools={<Tools isHome isSearch isNew titleNew="Nova" isReset />}
    >
      <TabsClassPage value={year_id} />
      <TableClassYearPage listData={listData} />
      <PaginationTable
        total={listData ? listData.length : 0}
        onClick={onClick}
      />
      <Footer />
    </LayoutBasePage>
  )
}
