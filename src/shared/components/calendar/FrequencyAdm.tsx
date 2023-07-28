import { useEffect, useMemo } from 'react'
import {
  useAppThemeContext,
  useAuthContext,
  useCalendarContext,
  useClassContext,
  useFrequencyContext,
  useSchoolContext,
} from '../../contexts'
import { CalendarBase } from './Base'
import { apiUsingNow } from '../../services'
import { iCalendar } from '../../interfaces'

export const CalendarFrequencyAdm = () => {
  const { setLoading } = useAppThemeContext()
  const { yearData } = useAuthContext()
  const { schoolRetrieve } = useSchoolContext()
  const { createFrequency } = useFrequencyContext()
  const { classWithSchoolSelect } = useClassContext()
  const { monthData, setEventData } = useCalendarContext()
  const frequency = useMemo(() => {
    if (classWithSchoolSelect && schoolRetrieve && yearData) {
      const students = classWithSchoolSelect.students.map((el) => {
        return { student_id: el.student.id }
      })

      return {
        class_id: classWithSchoolSelect.class.id,
        school_id: schoolRetrieve.id,
        year_id: yearData.id,
        students,
      }
    }
    return undefined
  }, [classWithSchoolSelect, schoolRetrieve, yearData])

  useEffect(() => {
    setEventData(undefined)
  }, [])

  useEffect(() => {
    if (yearData && schoolRetrieve && classWithSchoolSelect && monthData) {
      const query = `?month=${monthData}`
      setLoading(true)
      apiUsingNow
        .get<iCalendar[]>(
          `calendar/frequency/${yearData.id}/${schoolRetrieve.id}/${classWithSchoolSelect.class.id}${query}`,
        )
        .then((res) => setEventData(res.data))
        .finally(() => setLoading(false))
    }
  }, [classWithSchoolSelect, schoolRetrieve, monthData, yearData])

  return (
    <CalendarBase
      createFrequency={createFrequency}
      frequency={frequency}
      eventClick={(arg) => console.log(arg.event.start)}
    />
  )
}
