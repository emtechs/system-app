import { useEffect } from 'react'
import {
  useAppThemeContext,
  useAuthContext,
  useCalendarContext,
  useDrawerContext,
  usePaginationContext,
  useSchoolContext,
} from '../../contexts'
import { CalendarBase } from './Base'
import { apiUsingNow } from '../../services'
import { iCalendar } from '../../interfaces'
import { useNavigate } from 'react-router-dom'
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
  const { handleClickFrequency } = useDrawerContext()
  const { query } = usePaginationContext()

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
            `/frequency/list?date=${dayjs(arg.event.start).format(
              'DD/MM/YYYY',
            )}`,
          )
        } else {
          setDateData(dayjs(arg.event.start))
          navigate('/frequency')
        }
        handleClickFrequency()
      }}
      handleFrequency={onClick}
    />
  )
}
