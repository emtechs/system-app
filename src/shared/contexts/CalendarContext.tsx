import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { iCalendar, iChildren } from "../interfaces";
import dayjs, { Dayjs } from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/pt-br";
dayjs.extend(localizedFormat);

interface iCalendarContextData {
  dateData: dayjs.Dayjs;
  setDateData: Dispatch<SetStateAction<dayjs.Dayjs>>;
  eventData: iCalendar[] | undefined;
  setEventData: Dispatch<SetStateAction<iCalendar[] | undefined>>;
  monthData: string;
  setMonthData: Dispatch<SetStateAction<string>>;
}

const CalendarContext = createContext({} as iCalendarContextData);

export const CalendarProvider = ({ children }: iChildren) => {
  const [dateData, setDateData] = useState<Dayjs>(dayjs());
  const [eventData, setEventData] = useState<iCalendar[]>();
  const [monthData, setMonthData] = useState(dayjs().format("MMMM"));

  return (
    <CalendarContext.Provider
      value={{
        dateData,
        eventData,
        setDateData,
        setEventData,
        monthData,
        setMonthData,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendarContext = () => useContext(CalendarContext);
