import { useSearchParams } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import {
  useDebounce,
  usePaginationContext,
  useDialogContext,
  iUser,
  apiUser,
} from '../../../shared'
import {
  TableUserPage,
  DialogCreateAdmin,
  DialogCreateDirector,
  DialogActiveUser,
  DialogCreateSchoolServer,
  DialogCreateServer,
} from '../components'

export const ViewUserPage = () => {
  const [searchParams] = useSearchParams()
  const role = searchParams.get('role') || undefined
  const { debounce } = useDebounce()
  const { query, search, setIsLoading, setCount } = usePaginationContext()
  const { handleOpenEdit, openEdit } = useDialogContext()
  const [listData, setListData] = useState<iUser[]>([])
  const [userData, setUserData] = useState<iUser>()

  const handleUser = (newUser: iUser) => setUserData(newUser)

  const getUsers = useCallback((query: string) => {
    setIsLoading(true)
    apiUser
      .list(query)
      .then((res) => {
        setListData(res.result)
        setCount(res.total)
      })
      .finally(() => setIsLoading(false))
  }, [])

  const define_query = useCallback(
    (comp: string) => {
      let query_data = query() + comp
      if (role) query_data += `&role=${role}`
      return query_data
    },
    [query, role],
  )

  const list = () => getUsers(define_query(''))

  useEffect(() => {
    let query_data = ''
    if (search) {
      query_data += `&name=${search}`
      debounce(() => {
        getUsers(define_query(query_data))
      })
    } else getUsers(define_query(query_data))
  }, [debounce, define_query, getUsers, search])

  return (
    <>
      <TableUserPage listData={listData} handleUser={handleUser} />
      <DialogCreateAdmin />
      <DialogCreateDirector />
      <DialogCreateServer />
      {userData && <DialogActiveUser user={userData} getData={list} />}
      {userData && (
        <DialogCreateSchoolServer
          user_id={userData.id}
          user_name={userData.name}
          onClose={handleOpenEdit}
          open={openEdit}
        />
      )}
    </>
  )
}
