import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  useAuthContext,
  useSchoolContext,
  useCalendarContext,
  useParamsContext,
  apiUsingNow,
  iCalendar,
  CompLoading,
} from '../../../shared'
import { CalendarBase } from './Base'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/pt-br'
dayjs.extend(localizedFormat)

interface iCalendarSelectProps {
  onClick?: () => void
}

export const CalendarSelect = ({ onClick }: iCalendarSelectProps) => {
  const navigate = useNavigate()
  const { yearData } = useAuthContext()
  const { schoolSelect } = useSchoolContext()
  const { monthData, setEventData, setDateData } = useCalendarContext()
  const { query } = useParamsContext()
  const [loading, setLoading] = useState(false)

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
    <>
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
        }}
        handleFrequency={onClick}
      />
      <CompLoading loading={loading} />
    </>
  )
}
