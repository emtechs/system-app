import { useEffect } from 'react'
import {
  useAppThemeContext,
  useAuthContext,
  useCalendarContext,
} from '../../contexts'
import { iCalendar } from '../../interfaces'
import { apiUsingNow } from '../../services'
import { CalendarBase } from './Base'

export const CalendarDashAdmin = () => {
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

  return <CalendarBase eventClick={(arg) => console.log(arg.event.start)} />
}
