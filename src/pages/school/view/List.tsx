import { useCallback, useEffect, useState } from 'react'
import {
  useDebounce,
  usePaginationContext,
  useParamsContext,
  iSchool,
  apiSchool,
  DialogCreateSchool,
  DialogEditSchool,
  DialogDirectorSchool,
  DialogActiveSchool,
} from '../../../shared'
import { TableSchoolPage } from '../components'

export const ViewSchoolPage = () => {
  const { debounce } = useDebounce()
  const { setCount } = usePaginationContext()
  const { is_active, is_director, search, setIsLoading } = useParamsContext()
  const [listData, setListData] = useState<iSchool[]>([])
  const [schoolData, setSchoolData] = useState<iSchool>()

  const handleSchool = (newSchool: iSchool) => setSchoolData(newSchool)

  const getSchools = useCallback((query: string) => {
    setIsLoading(true)
    apiSchool
      .list(query)
      .then((res) => {
        setListData(res.result)
        setCount(res.total)
      })
      .finally(() => setIsLoading(false))
  }, [])

  const define_query = useCallback(
    (comp: string) => {
      return '?by=asc' + comp + is_director + is_active()
    },
    [is_active, is_director],
  )

  const list = () => getSchools(define_query(''))

  useEffect(() => {
    let query_data = ''
    if (search) {
      query_data += `&name=${search}`
      debounce(() => {
        getSchools(define_query(query_data))
      })
    } else getSchools(define_query(query_data))
  }, [debounce, define_query, getSchools, search])

  return (
    <>
      <TableSchoolPage listData={listData} handleSchool={handleSchool} />
      <DialogCreateSchool />
      {schoolData && <DialogEditSchool school={schoolData} getData={list} />}
      {schoolData && (
        <DialogDirectorSchool school={schoolData} getData={list} />
      )}
      {schoolData && <DialogActiveSchool school={schoolData} getData={list} />}
    </>
  )
}
