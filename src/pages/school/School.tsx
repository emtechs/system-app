import { Outlet, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useVerifySchool } from '../../shared/hooks'
import {
  ToolsSchool,
  Footer,
  DialogActiveSchool,
  DialogCreateSchool,
  DialogDirectorSchool,
  DialogEditSchool,
  TitleBasePage,
} from '../../shared/components'
import { LayoutBasePage } from '../../shared/layouts'
import { TableSchoolPage } from './components'
import { iSchool } from '../../shared/interfaces'
import { Chip } from '@mui/material'
import { School } from '@mui/icons-material'

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
        title={
          <TitleBasePage>
            <Chip
              label="Escolas"
              color="primary"
              icon={<School sx={{ mr: 0.5 }} fontSize="inherit" />}
            />
          </TitleBasePage>
        }
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
