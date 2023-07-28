import { Checklist, History, Person, School } from '@mui/icons-material'
import { useUserContext } from '../../contexts'
import { TabsBase } from './Base'

interface iTabsUserRetrievePageProps {
  value?: string
}

export const TabsUserRetrievePage = ({
  value = '',
}: iTabsUserRetrievePageProps) => {
  const { userRetrieve } = useUserContext()

  const href = `/user/${userRetrieve?.id}`

  const elemArr = [
    { icon: <Person />, label: 'Usuário', value: '', href },
    {
      icon: <School />,
      label: 'Escolas',
      disabled: userRetrieve?.role === 'ADMIN',
      value: 'school',
      href: `${href}/school`,
    },
    {
      icon: <Checklist />,
      label: 'Frequências',
      disabled: userRetrieve?.frequencies === 0,
      value: 'frequency',
      href: `${href}/frequency`,
    },
    {
      icon: <History />,
      label: 'Histórico',
      disabled: userRetrieve?.frequencies === 0,
      value: 'history',
      href: `${href}/history`,
    },
  ]

  return <TabsBase value={value} elemArr={elemArr} />
}
