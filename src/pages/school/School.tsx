import { Outlet, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useVerifySchool } from '../../shared/hooks'
import {
  TitleSchoolPage,
  ToolsSchool,
  Footer,
  DialogActiveSchool,
  DialogCreateSchool,
  DialogDirectorSchool,
  DialogEditSchool,
} from '../../shared/components'
import { LayoutBasePage } from '../../shared/layouts'
import { TableSchoolPage } from './components'
import { iSchool } from '../../shared/interfaces'

export const SchoolPage = () => {
  const { school_id } = useParams()
  const { verifySchool } = useVerifySchool()
  const [schoolData, setSchoolData] = useState<iSchool>()

  const handleSchool = (newSchool: iSchool) => setSchoolData(newSchool)

  useEffect(() => {
    if (school_id) verifySchool(school_id)
  }, [school_id, verifySchool])

  if (school_id) return <Outlet />

  return (
    <>
      <LayoutBasePage
        title={<TitleSchoolPage />}
        tools={
          <ToolsSchool
            isHome
            isSearch
            isDirector
            isActive
            isNew
            titleNew="Nova"
            isReset
          />
        }
      >
        <TableSchoolPage handleSchool={handleSchool} />
        <Footer />
      </LayoutBasePage>
      <DialogCreateSchool />
      {schoolData && <DialogEditSchool school={schoolData} locale="list" />}
      {schoolData && <DialogDirectorSchool school={schoolData} locale="list" />}
      {schoolData && <DialogActiveSchool school={schoolData} locale="list" />}
    </>
  )
}
