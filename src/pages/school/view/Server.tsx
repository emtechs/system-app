import { People, PersonAdd } from '@mui/icons-material'
import { Chip } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  usePaginationContext,
  iSchoolUser,
  apiSchoolRetrieve,
  LayoutBasePage,
  TitleBaseItemsPage,
  LabelSchool,
  Tools,
  TabsSchoolRetrievePage,
  Footer,
  DialogCreateServer,
  useDebounce,
} from '../../../shared'
import { TableSchoolServerPage } from '../components'

export const ViewSchoolServerPage = () => {
  const { school_id } = useParams()
  const { debounce } = useDebounce()
  const { setIsLoading, setCount, search } = usePaginationContext()
  const [listData, setListData] = useState<iSchoolUser[]>([])

  const getServer = useCallback(
    (query: string) => {
      if (school_id) {
        setIsLoading(true)
        apiSchoolRetrieve
          .server(school_id, query)
          .then((res) => {
            setListData(res.result)
            setCount(res.total)
          })
          .finally(() => setIsLoading(false))
      }
    },
    [school_id],
  )

  const getData = () => getServer('')

  useEffect(() => {
    if (search) {
      const query_data = `&name=${search}`
      debounce(() => {
        getServer(query_data)
      })
    } else getServer('')
  }, [search])

  return (
    <>
      <LayoutBasePage
        title={
          <TitleBaseItemsPage>
            <LabelSchool clickable />
            <Chip
              color="primary"
              label="Servidores"
              icon={<People sx={{ mr: 0.5 }} fontSize="inherit" />}
            />
          </TitleBaseItemsPage>
        }
        tools={
          <Tools
            back="/school"
            iconNew={<PersonAdd />}
            isNew
            titleNew="Servidor"
            isSearch
            isDash
            isReset
          />
        }
      >
        <TabsSchoolRetrievePage value="server" />
        <TableSchoolServerPage getData={getData} listData={listData} />
        <Footer />
      </LayoutBasePage>
      <DialogCreateServer getServer={getServer} school_id={school_id} />
    </>
  )
}
