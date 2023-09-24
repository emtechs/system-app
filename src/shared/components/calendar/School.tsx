import { useEffect } from 'react'
import {
  useAppThemeContext,
  useAuthContext,
  useCalendarContext,
  useParamsContext,
  useSchoolContext,
} from '../../contexts'
import { CalendarBase } from './Base'
import { apiUsingNow } from '../../services'
import { iCalendar } from '../../interfaces'

export const CalendarDashSchool = () => {
  const { setLoading } = useAppThemeContext()
  const { yearData } = useAuthContext()
  const { schoolRetrieve } = useSchoolContext()
  const { monthData, setEventData } = useCalendarContext()
  const { query } = useParamsContext()

  useEffect(() => {
    setEventData(undefined)
  }, [])

  useEffect(() => {
    if (yearData && schoolRetrieve && monthData) {
      const query_data = query(
        undefined,
        schoolRetrieve.id,
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
  }, [schoolRetrieve, monthData, yearData, query])

  return <CalendarBase />
}
