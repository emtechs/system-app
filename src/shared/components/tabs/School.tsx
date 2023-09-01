import {
  Checklist,
  Groups,
  People,
  Percent,
  School,
  Workspaces,
} from '@mui/icons-material'
import { useSchoolContext } from '../../contexts'
import { TabsBase } from './Base'

interface iTabsSchoolRetrievePageProps {
  value?: string
}

export const TabsSchoolRetrievePage = ({
  value = '',
}: iTabsSchoolRetrievePageProps) => {
  const { schoolSelect, schoolRetrieve } = useSchoolContext()

  const href = `/school/${schoolSelect?.id}`

  const elemArr = [
    { icon: <School />, label: 'Escola', value: '', href },
    {
      icon: <People />,
      label: 'Servidores',
      value: 'server',
      href: `${href}/server`,
    },
    {
      icon: <Workspaces />,
      label: 'Turmas',
      value: 'class',
      href: `${href}/class`,
    },
    {
      icon: <Groups />,
      label: 'Alunos',
      disabled: schoolRetrieve?.classes === 0,
      value: 'student',
      href: `${href}/student`,
    },
    {
      icon: <Checklist />,
      label: 'Frequências',
      disabled: schoolRetrieve?.classes === 0,
      value: 'frequency',
      href: `${href}/frequency`,
    },
    {
      icon: <Percent />,
      label: 'Infrequência',
      disabled: schoolRetrieve?.frequencies === 0,
      value: 'infrequency',
      href: `${href}/infrequency`,
    },
  ]

  return <TabsBase value={value} elemArr={elemArr} />
}
