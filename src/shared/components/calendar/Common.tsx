import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  useAppThemeContext,
  useAuthContext,
  useSchoolContext,
  useCalendarContext,
  useDialogContext,
  useParamsContext,
  apiUsingNow,
  iCalendar,
} from '../../../shared'
import { CalendarBase } from './Base'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/pt-br'
dayjs.extend(localizedFormat)

interface iCalendarDashCommonProps {
  onClick?: () => void
}

export const CalendarDashCommon = ({ onClick }: iCalendarDashCommonProps) => {
  const navigate = useNavigate()
  const { setLoading } = useAppThemeContext()
  const { yearData } = useAuthContext()
  const { schoolSelect } = useSchoolContext()
  const { monthData, setEventData, setDateData } = useCalendarContext()
  const { handleOpenCreate } = useDialogContext()
  const { query } = useParamsContext()

  useEffect(() => {
    setEventData(undefined)
  }, [])

  useEffect(() => {
    if (yearData && schoolSelect && monthData) {
      const query_data = query(
        undefined,
        schoolSelect.id,
        undefined,
        undefined,
        monthData,
      )
      setLoading(true)
      apiUsingNow
        .get<iCalendar[]>(`calendar/${yearData.id}${query_data}`)
        .then((res) => setEventData(res.data))
        .finally(() => setLoading(false))
    }
  }, [schoolSelect, monthData, yearData, query])

  return (
    <CalendarBase
      eventClick={(arg) => {
        if (onClick) onClick()
        if (arg.event.classNames.includes('allFrequency')) {
          navigate(
            `/${schoolSelect?.id}/frequency?year_id=day&date=${dayjs(
              arg.event.start,
            ).format('DD/MM/YYYY')}`,
          )
        } else {
          setDateData(dayjs(arg.event.start))
          handleOpenCreate()
        }
      }}
      handleFrequency={onClick}
    />
  )
}
