import { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useVerifyClassKey } from '../../../shared'
import { ViewClassStudentPage } from './Student'

export const ViewClassKeyPage = () => {
  const { view: key } = useParams()
  const [searchParams] = useSearchParams()
  const view = searchParams.get('view')
  const { verifyClassKey } = useVerifyClassKey()

  useEffect(() => {
    if (key) verifyClassKey(key)
  }, [verifyClassKey, key])

  switch (view) {
    case 'server':
      return <></>
    case 'class':
      return <></>
    case 'student':
      return <ViewClassStudentPage />
    case 'frequency':
      return <></>
    case 'infrequency':
      return <></>
  }

  return <></>
}
