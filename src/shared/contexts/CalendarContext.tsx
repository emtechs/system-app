import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react'
import {
  iCalendar,
  iSelectBase,
  iYear,
  iPeriod,
  iMonth,
  iChildren,
} from '../../shared'
import dayjs, { Dayjs } from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/pt-br'
dayjs.extend(localizedFormat)

interface iCalendarContextData {
  dateData: dayjs.Dayjs
  setDateData: Dispatch<SetStateAction<dayjs.Dayjs>>
  eventData: iCalendar[] | undefined
  setEventData: Dispatch<SetStateAction<iCalendar[] | undefined>>
  monthData: string
  setMonthData: Dispatch<SetStateAction<string>>
  yearSelect: iSelectBase | undefined
  setYearSelect: Dispatch<SetStateAction<iSelectBase | undefined>>
  yearIdSelect: string | undefined
  setYearIdSelect: Dispatch<SetStateAction<string | undefined>>
  listYear: iYear[]
  handleListYear: (newList: iYear[]) => void
  listPeriod: iPeriod[]
  handleListPeriod: (newList: iPeriod[]) => void
  listMonth: iMonth[] | undefined
  handleListMonth: (newList: iMonth[]) => void
}

const CalendarContext = createContext({} as iCalendarContextData)

export const CalendarProvider = ({ children }: iChildren) => {
  const [dateData, setDateData] = useState<Dayjs>(dayjs())
  const [eventData, setEventData] = useState<iCalendar[]>()
  const [monthData, setMonthData] = useState(dayjs().format('MMMM'))
  const [yearSelect, setYearSelect] = useState<iSelectBase>()
  const [yearIdSelect, setYearIdSelect] = useState<string>()
  const [listYear, setListYear] = useState<iYear[]>([])
  const [listPeriod, setListPeriod] = useState<iPeriod[]>([])
  const [listMonth, setListMonth] = useState<iMonth[]>()

  const handleListYear = useCallback(
    (newList: iYear[]) => setListYear(newList),
    [],
  )

  const handleListPeriod = useCallback(
    (newList: iPeriod[]) => setListPeriod(newList),
    [],
  )

  const handleListMonth = useCallback(
    (newList: iMonth[]) => setListMonth(newList),
    [],
  )

  return (
    <CalendarContext.Provider
      value={{
        dateData,
        eventData,
        setDateData,
        setEventData,
        monthData,
        setMonthData,
        yearSelect,
        setYearSelect,
        setYearIdSelect,
        yearIdSelect,
        handleListMonth,
        handleListPeriod,
        handleListYear,
        listMonth,
        listPeriod,
        listYear,
      }}
    >
      {children}
    </CalendarContext.Provider>
  )
}

export const useCalendarContext = () => useContext(CalendarContext)
