import { useState, useCallback, useEffect } from 'react'
import { School } from '@mui/icons-material'
import { Chip } from '@mui/material'
import {
  LayoutBasePage,
  Tools,
  Footer,
  TitleBasePage,
  useDebounce,
  usePaginationContext,
  useParamsContext,
  iResumeFreq,
  apiFrequency,
  useAuthContext,
} from '../../../shared'
import { TableSchoolUtilPage, TabsSchoolPage } from '../components'

export const ViewSchoolUtilPage = () => {
  const { debounce } = useDebounce()
  const { yearData } = useAuthContext()
  const { setCount } = usePaginationContext()
  const { search, setIsLoading } = useParamsContext()
  const [listData, setListData] = useState<iResumeFreq[]>([])

  const getSchools = useCallback((year_id: string, query: string) => {
    setIsLoading(true)
    apiFrequency
      .resume(year_id, query)
      .then((res) => {
        setListData(res.result)
        setCount(res.total)
      })
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    if (yearData) {
      if (search) {
        debounce(() => {
          getSchools(yearData.id, `?name=${search}`)
        })
      } else getSchools(yearData.id, '')
    }
  }, [debounce, getSchools, search, yearData])

  return (
    <LayoutBasePage
      title={
        <TitleBasePage>
          <Chip
            label="Escolas"
            color="primary"
            icon={<School sx={{ mr: 0.5 }} fontSize="inherit" />}
          />
        </TitleBasePage>
      }
      tools={<Tools isHome isSearch isReset />}
    >
      <TabsSchoolPage value="util" />
      <TableSchoolUtilPage listData={listData} />
      <Footer />
    </LayoutBasePage>
  )
}
