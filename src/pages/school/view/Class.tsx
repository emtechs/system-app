import { Workspaces } from '@mui/icons-material'
import { Box, Chip } from '@mui/material'
import { SyntheticEvent, useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  useDebounce,
  useAuthContext,
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
} from '../../../shared'
import { TableSchoolClassPage } from '../components'

export const ViewSchoolClassPage = () => {
  const { school_id } = useParams()
  const { debounce } = useDebounce()
  const { listYear } = useAuthContext()
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

  const define_query = useCallback(
    (comp: string) => {
      return `?school_id=${school_id}&year_id=${listYear[index].id}${comp}`
    },
    [index, listYear, school_id],
  )

  useEffect(() => {
    if (search) {
      const query_data = `&name=${search}`
      debounce(() => {
        getClass(define_query(query_data))
      })
    } else getClass(define_query(''))
  }, [define_query, search])

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
    </>
  )
}
