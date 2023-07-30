import { useParams } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import { School } from '@mui/icons-material'
import { Chip } from '@mui/material'
import {
  useDialogContext,
  usePaginationContext,
  useUserContext,
} from '../../../shared/contexts'
import { useDebounce } from '../../../shared/hooks'
import { iSchool } from '../../../shared/interfaces'
import { apiSchool } from '../../../shared/services'
import {
  DialogCreateSchoolServer,
  DialogRemoveUser,
  Footer,
  LabelUser,
  TabsUserRetrievePage,
  TitleBaseItemsPage,
  ToolsUser,
} from '../../../shared/components'
import { LayoutBasePage } from '../../../shared/layouts'
import { TableUserSchoolPage } from '../components'

export const ViewUserSchoolPage = () => {
  const { user_id } = useParams()
  const { debounce } = useDebounce()
  const { userRetrieve } = useUserContext()
  const { search, setIsLoading, setCount } = usePaginationContext()
  const { openCreate, handleOpenCreate } = useDialogContext()
  const [listData, setListData] = useState<iSchool[]>([])
  const [schoolData, setSchoolData] = useState<iSchool>()

  const handleSchool = (newSchool: iSchool) => setSchoolData(newSchool)

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
        tools={
          <ToolsUser back="/user" isNew titleNew="Nova" isSearch isReset />
        }
      >
        <TabsUserRetrievePage value="school" />
        <TableUserSchoolPage listData={listData} handleSchool={handleSchool} />
        <Footer />
      </LayoutBasePage>
      {userRetrieve && (
        <>
          <DialogCreateSchoolServer
            user={userRetrieve}
            getData={list}
            open={openCreate}
            onClose={handleOpenCreate}
          />
          {schoolData && (
            <DialogRemoveUser
              user={userRetrieve}
              school={schoolData}
              getData={list}
            />
          )}
        </>
      )}
    </>
  )
}