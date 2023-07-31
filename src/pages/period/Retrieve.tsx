import { useSearchParams } from 'react-router-dom'
import { Today } from '@mui/icons-material'
import {
  useAppThemeContext,
  LayoutBasePage,
  TitleBaseItemsPage,
  LinkChip,
  LabelYear,
  Tools,
  Footer,
} from '../../shared'
import { ViewRetrievePeriodPage } from './view'
import { TabsPeriodRetrievePage } from './components'

export const RetrievePeriodPage = () => {
  const { mdDown } = useAppThemeContext()
  const [searchParams] = useSearchParams()
  const view = searchParams.get('view') || undefined

  return (
    <LayoutBasePage
      title={
        <TitleBaseItemsPage>
          <LinkChip
            label={mdDown ? '...' : 'Período'}
            icon={<Today sx={{ mr: 0.5 }} fontSize="inherit" />}
            to="/period"
          />
          <LabelYear />
        </TitleBaseItemsPage>
      }
      tools={<Tools back="/period" isHome isNew isSearch isReset />}
    >
      <TabsPeriodRetrievePage value={view} />
      <ViewRetrievePeriodPage />
      <Footer />
    </LayoutBasePage>
  )
}
