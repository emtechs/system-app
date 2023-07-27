import { Workspaces } from '@mui/icons-material'
import { Box, Chip } from '@mui/material'
import { SyntheticEvent, useCallback, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  TitleSchoolViewPage,
  ToolsSchool,
  TabsSchoolRetrievePage,
  Footer,
  TabsYear,
} from '../../../shared/components'
import { LayoutBasePage } from '../../../shared/layouts'
import { TableSchoolClassPage } from '../components'
import { iSchoolClass } from '../../../shared/interfaces'
import { apiSchoolRetrieve } from '../../../shared/services'
import { useAuthContext, usePaginationContext } from '../../../shared/contexts'

export const ViewSchoolClassPage = () => {
  const { school_id } = useParams()
  const { listYear } = useAuthContext()
  const { setIsLoading, setCount } = usePaginationContext()
  const [listData, setListData] = useState<iSchoolClass[]>([])
  const [index, setIndex] = useState(0)

  const handleChange = (_event: SyntheticEvent, newValue: string | number) => {
    setIndex(Number(newValue))
  }

  const year_id = useMemo(() => {
    return listYear[index].id
  }, [index, listYear])

  const getClass = useCallback(
    (query: string) => {
      if (school_id) {
        setIsLoading(true)
        apiSchoolRetrieve
          .classData(school_id, `${query}&year_id=${year_id}`)
          .then((res) => {
            setListData(res.result)
            setCount(res.total)
          })
          .finally(() => setIsLoading(false))
      }
    },
    [school_id, year_id],
  )

  return (
    <>
      <LayoutBasePage
        title={
          <TitleSchoolViewPage>
            <Chip
              color="primary"
              label="Turmas"
              icon={<Workspaces sx={{ mr: 0.5 }} fontSize="inherit" />}
            />
          </TitleSchoolViewPage>
        }
        tools={
          <ToolsSchool back="/school" isNew titleNew="Turma" isDash isSearch />
        }
      >
        <TabsSchoolRetrievePage value="class" />
        <Box display="flex" justifyContent="space-between">
          <TabsYear value={index} handleChange={handleChange} />
          <Box flex={1}>
            <TableSchoolClassPage getClass={getClass} listData={listData} />
          </Box>
        </Box>
        <Footer />
      </LayoutBasePage>
    </>
  )
}
