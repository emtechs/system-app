import { Groups, Workspaces } from '@mui/icons-material'
import { useParams } from 'react-router-dom'
import { TabsBase } from '../../../../shared/components/tabs/Base'

interface iTabsClassKeyPageProps {
  value?: string
}

export const TabsClassKeyPage = ({ value = '' }: iTabsClassKeyPageProps) => {
  const { view: key } = useParams()

  const href = `/class/key/${key}`

  const elemArr = [
    { icon: <Workspaces />, label: 'Turma', value: '', href },
    {
      icon: <Groups />,
      label: 'Alunos',
      value: 'student',
      href: `${href}?view=student`,
    },
  ]

  return <TabsBase value={value} elemArr={elemArr} />
}
