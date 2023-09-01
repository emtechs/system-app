import { Workspaces } from '@mui/icons-material'
import { Box, Chip } from '@mui/material'
import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useParams } from 'react-router-dom'
import {
  useDebounce,
  usePaginationContext,
  iClass,
  apiClass,
  LayoutBasePage,
  TitleBaseItemsPage,
  LabelSchool,
  Tools,
  TabsSchoolRetrievePage,
  TabsYear,
  Footer,
  useCalendarContext,
} from '../../../shared'
import { DialogSchoolClassPage, TableSchoolClassPage } from '../components'

export const ViewSchoolClassPage = () => {
  const { school_id } = useParams()
  const { debounce } = useDebounce()
  const { listYear } = useCalendarContext()
  const { setIsLoading, setCount, search } = usePaginationContext()
  const [listData, setListData] = useState<iClass[]>([])
  const [index, setIndex] = useState(0)

  const handleChange = (_event: SyntheticEvent, newValue: string | number) => {
    setIndex(Number(newValue))
  }

  const getClass = useCallback((query: string) => {
    setIsLoading(true)
    apiClass
      .listClass(query)
      .then((res) => {
        setListData(res.result)
        setCount(res.total)
      })
      .finally(() => setIsLoading(false))
  }, [])

  const year_id = useMemo(() => {
    return listYear[index].id
  }, [index, listYear])

  const define_query = useCallback(
    (comp: string) => {
      return `?school_id=${school_id}&year_id=${year_id}${comp}`
    },
    [school_id, year_id],
  )

  useEffect(() => {
    if (search) {
      const query_data = `&name=${search}`
      debounce(() => {
        getClass(define_query(query_data))
      })
    } else getClass(define_query(''))
  }, [define_query, search])

  const getData = () => getClass(define_query(''))

  return (
    <>
      <LayoutBasePage
        title={
          <TitleBaseItemsPage>
            <LabelSchool clickable />
            <Chip
              color="primary"
              label="Turmas"
              icon={<Workspaces sx={{ mr: 0.5 }} fontSize="inherit" />}
            />
          </TitleBaseItemsPage>
        }
        tools={
          <Tools
            back="/school"
            isNew
            titleNew="Turma"
            isDash
            isSearch
            isReset
          />
        }
      >
        <TabsSchoolRetrievePage value="class" />
        <Box display="flex" justifyContent="space-between">
          <TabsYear value={index} handleChange={handleChange} />
          <Box flex={1}>
            <TableSchoolClassPage listData={listData} />
          </Box>
        </Box>
        <Footer />
      </LayoutBasePage>
      {school_id && (
        <DialogSchoolClassPage
          school_id={school_id}
          year_id={year_id}
          getData={getData}
        />
      )}
    </>
  )
}
