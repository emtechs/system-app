import { useCallback, useEffect, useState } from 'react'
import { apiFrequency, iRequest, usePaginationContext } from '../../../shared'
import { TableRequestPage } from '../components'

export const ViewRequestPage = () => {
  const { setIsLoading, setCount } = usePaginationContext()
  const [requestData, setRequestData] = useState<iRequest[]>([])

  const getRequest = useCallback(() => {
    setIsLoading(true)
    apiFrequency
      .listRequest()
      .then((res) => {
        setRequestData(res.result)
        setCount(res.total)
      })
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => getRequest(), [])

  return <TableRequestPage listData={requestData} />
}
