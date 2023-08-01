import { useEffect } from 'react'
import { Outlet, useParams, useSearchParams } from 'react-router-dom'
import {
  useVerifyClass,
  useVerifyYear,
  useVerifyClassKey,
  LayoutBasePage,
  Tools,
  Footer,
} from '../../shared'
import { TabsClassPage, TitleClassPage, TitleClassYearPage } from './components'
import { ViewClassPage, ViewClassYearPage } from './view'

export const ClassPage = () => {
  const [searchParams] = useSearchParams()
  const year_id = searchParams.get('year_id') || undefined
  const { class_id, key } = useParams()
  const { verifyClass } = useVerifyClass()
  const { verifyYear } = useVerifyYear()
  const { verifyClassKey } = useVerifyClassKey()

  useEffect(() => {
    if (class_id) verifyClass(class_id)
    if (year_id) verifyYear(year_id)
    if (key) verifyClassKey(key)
  }, [class_id, key, verifyClass, verifyClassKey, verifyYear, year_id])

  if (class_id || key) return <Outlet />

  return (
    <LayoutBasePage
      title={year_id ? <TitleClassYearPage /> : <TitleClassPage />}
      tools={<Tools isHome isSearch isNew titleNew="Nova" isReset />}
    >
      <TabsClassPage value={year_id} />
      {year_id ? <ViewClassYearPage year_id={year_id} /> : <ViewClassPage />}
      <Footer />
    </LayoutBasePage>
  )
}
