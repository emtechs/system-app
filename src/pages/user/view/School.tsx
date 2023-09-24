import { useParams } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import { School } from '@mui/icons-material'
import { Chip } from '@mui/material'
import {
  useDebounce,
  useUserContext,
  usePaginationContext,
  useDialogContext,
  iSchool,
  apiSchool,
  LayoutBasePage,
  TitleBaseItemsPage,
  LabelUser,
  Tools,
  TabsUserRetrievePage,
  Footer,
  useParamsContext,
} from '../../../shared'
import { DialogCreateSchoolServer, TableUserSchoolPage } from '../components'

export const ViewUserSchoolPage = () => {
  const { user_id } = useParams()
  const { debounce } = useDebounce()
  const { userSelect } = useUserContext()
  const { setCount } = usePaginationContext()
  const { search, setIsLoading } = useParamsContext()
  const { openCreate, handleOpenCreate } = useDialogContext()
  const [listData, setListData] = useState<iSchool[]>([])

  const getSchool = useCallback((query: string) => {
    setIsLoading(true)
    apiSchool
      .listServers(query)
      .then((res) => {
        setListData(res.result)
        setCount(res.total)
      })
      .finally(() => setIsLoading(false))
  }, [])

  const define_query = useCallback(
    (comp: string) => {
      return `?user_id=${user_id}${comp}`
    },
    [user_id],
  )

  const list = () => getSchool(define_query(''))

  useEffect(() => {
    let query_data = ''
    if (search) {
      query_data += `&name=${search}`
      debounce(() => {
        getSchool(define_query(query_data))
      })
    } else getSchool(define_query(query_data))
  }, [debounce, define_query, getSchool, search])

  return (
    <>
      <LayoutBasePage
        title={
          <TitleBaseItemsPage>
            <LabelUser clickable to={`/user/${user_id}`} />
            <Chip
              color="primary"
              label="Escolas"
              icon={<School sx={{ mr: 0.5 }} fontSize="inherit" />}
            />
          </TitleBaseItemsPage>
        }
        tools={<Tools isBack isNew titleNew="Nova" isSearch isReset />}
      >
        <TabsUserRetrievePage value="school" />
        <TableUserSchoolPage listData={listData} getData={list} />
        <Footer />
      </LayoutBasePage>
      {userSelect && (
        <DialogCreateSchoolServer
          getData={list}
          open={openCreate}
          onClose={handleOpenCreate}
          user_id={userSelect.id}
          user_name={userSelect.label}
        />
      )}
    </>
  )
}
