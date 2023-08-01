import { Workspaces, Groups, Checklist, Percent } from '@mui/icons-material'
import { useParams } from 'react-router-dom'
import { useClassContext } from '../../../contexts'
import { TabsBase } from '../Base'

interface iTabsClassYearRetrievePageProps {
  value?: string
}

export const TabsClassYearRetrievePage = ({
  value,
}: iTabsClassYearRetrievePageProps) => {
  const { class_id } = useParams()
  const { classRetrieve } = useClassContext()

  const href = `/year/class/${class_id}`

  const elemArr = [
    { icon: <Workspaces />, label: 'Turma', value: '', href },
    {
      icon: <Groups />,
      label: 'Alunos',
      value: 'student',
      href: `${href}/student`,
    },
    {
      icon: <Checklist />,
      label: 'Frequências',
      disabled: classRetrieve?.students === 0,
      value: 'frequency',
      href: `${href}/frequency`,
    },
    {
      icon: <Percent />,
      label: 'Infrequência',
      disabled: classRetrieve?.frequencies === 0,
      value: 'infrequency',
      href: `${href}/infrequency`,
    },
  ]

  return <TabsBase value={value} elemArr={elemArr} />
}
