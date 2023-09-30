import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  useAppThemeContext,
  useAuthContext,
  useCalendarContext,
} from '../../contexts'
import { iCalendar } from '../../interfaces'
import { apiUsingNow } from '../../services'
import { CalendarBase } from './Base'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/pt-br'
dayjs.extend(localizedFormat)

export const CalendarDashAdmin = () => {
  const navigate = useNavigate()
  const { setLoading } = useAppThemeContext()
  const { yearData } = useAuthContext()
  const { monthData, setEventData } = useCalendarContext()

  useEffect(() => {
    setEventData(undefined)
  }, [])

  useEffect(() => {
    if (yearData && monthData) {
      const query = `?month=${monthData}`
      setLoading(true)
      apiUsingNow
        .get<iCalendar[]>(`calendar/${yearData.id}${query}`)
        .then((res) => setEventData(res.data))
        .finally(() => setLoading(false))
    }
  }, [monthData, yearData])

  return (
    <CalendarBase
      eventClick={(arg) =>
        navigate(
          `/frequency?year_id=day&date=${dayjs(arg.event.start).format(
            'DD/MM/YYYY',
          )}`,
        )
      }
    />
  )
}
