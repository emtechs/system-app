import { useEffect } from 'react'
import { useAppThemeContext, useCalendarContext } from '../../contexts'
import { CalendarBase } from './Base'
import { apiUsingNow } from '../../services'
import { iCalendar } from '../../interfaces'

interface iCalendarStudentProps {
  id: string
}

export const CalendarStudent = ({ id }: iCalendarStudentProps) => {
  const { setLoading } = useAppThemeContext()
  const { monthData, setEventData } = useCalendarContext()

  useEffect(() => {
    setEventData(undefined)
  }, [])

  useEffect(() => {
    if (monthData) {
      const query = `?month=${monthData}`
      setLoading(true)
      apiUsingNow
        .get<iCalendar[]>(`calendar/student/${id}${query}`)
        .then((res) => setEventData(res.data))
        .finally(() => setLoading(false))
    }
  }, [id, monthData])

  return <CalendarBase eventClick={(arg) => console.log(arg.event.start)} />
}
