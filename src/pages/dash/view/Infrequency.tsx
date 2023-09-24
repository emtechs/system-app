import { Percent } from '@mui/icons-material'
import { Chip } from '@mui/material'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import {
  LayoutBasePage,
  TitleSchoolDashViewPage,
  Footer,
  TabsInfrequencyPage,
  apiInfrequency,
  iDataInfrequency,
  useAuthContext,
  useParamsContext,
} from '../../../shared'
import { TableDashboardSchoolInfrequencyPage } from '../components'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/pt-br'
import { InfrequencyPeriod } from './InfrequencyPeriod'
dayjs.extend(localizedFormat)

interface iViewDashboardSchoolInfrequencyPageProps {
  year_id?: string
}

export const ViewDashboardSchoolInfrequencyPage = ({
  year_id,
}: iViewDashboardSchoolInfrequencyPageProps) => {
  const { school_id } = useParams()
  const [searchParams] = useSearchParams()
  const date = searchParams.get('date') || undefined
  const { yearData } = useAuthContext()
  const { setIsLoading } = useParamsContext()
  const [listData, setListData] = useState<iDataInfrequency[]>([])

  const getInfrequency = useCallback(
    (school_id: string, year_id_data: string, query: string) => {
      setIsLoading(true)
      apiInfrequency
        .school(school_id, year_id_data, query)
        .then((res) => setListData(res))
        .finally(() => setIsLoading(false))
    },
    [],
  )

  const query = useMemo(() => {
    if (date) return `?date=${date}`
    return `?date=${dayjs().format('DD/MM/YYYY')}`
  }, [date])

  useEffect(() => {
    if (school_id && yearData) {
      getInfrequency(school_id, yearData.id, query)
    }
  }, [getInfrequency, query, school_id, yearData])

  return (
    <LayoutBasePage
      title={
        <TitleSchoolDashViewPage>
          <Chip
            color="primary"
            label="Infrequência"
            icon={<Percent sx={{ mr: 0.5 }} fontSize="inherit" />}
          />
        </TitleSchoolDashViewPage>
      }
    >
      <TabsInfrequencyPage
        date={date}
        value={year_id}
        href={`/${school_id}/infrequency`}
      />
      {year_id ? (
        <InfrequencyPeriod year_id={year_id} />
      ) : (
        <TableDashboardSchoolInfrequencyPage listData={listData} />
      )}
      <Footer />
    </LayoutBasePage>
  )
}
