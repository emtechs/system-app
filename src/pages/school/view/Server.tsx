import { People, PersonAdd } from '@mui/icons-material'
import { Chip } from '@mui/material'
import { useCallback, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  ToolsSchool,
  TabsSchoolRetrievePage,
  Footer,
  DialogCreateServer,
  TitleBaseItemsPage,
  LabelSchool,
} from '../../../shared/components'
import { LayoutBasePage } from '../../../shared/layouts'
import { TableSchoolServerPage } from '../components'
import { iSchoolUser } from '../../../shared/interfaces'
import { apiSchoolRetrieve } from '../../../shared/services'
import { usePaginationContext } from '../../../shared/contexts'

export const ViewSchoolServerPage = () => {
  const { school_id } = useParams()
  const { setIsLoading, setCount } = usePaginationContext()
  const [listData, setListData] = useState<iSchoolUser[]>([])
  const [userData, setUserData] = useState<iSchoolUser>()

  const handleUser = (newUser: iSchoolUser) => setUserData(newUser)

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
          <ToolsSchool
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
        <TableSchoolServerPage
          getServer={getServer}
          handleUser={handleUser}
          listData={listData}
        />
        <Footer />
      </LayoutBasePage>
      <DialogCreateServer getServer={getServer} school_id={school_id} />
      {userData && <></>}
    </>
  )
}
