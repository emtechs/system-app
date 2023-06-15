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
  dateData: string;
  setDateData: Dispatch<SetStateAction<string>>;
  eventData: iCalendar[] | undefined;
  setEventData: Dispatch<SetStateAction<iCalendar[] | undefined>>;
  start_date: string | undefined;
  setStart_date: Dispatch<SetStateAction<string | undefined>>;
  end_date: string;
  setEnd_date: Dispatch<SetStateAction<string>>;
  dateFrequency: dayjs.Dayjs | undefined;
  setDateFrequency: Dispatch<SetStateAction<dayjs.Dayjs | undefined>>;
}

const CalendarContext = createContext({} as iCalendarContextData);

export const CalendarProvider = ({ children }: iChildren) => {
  const [dateData, setDateData] = useState(dayjs().format("DD/MM/YYYY"));
  const [eventData, setEventData] = useState<iCalendar[]>();
  const [start_date, setStart_date] = useState<string>();
  const [end_date, setEnd_date] = useState(dayjs().format("DD/MM/YYYY"));
  const [dateFrequency, setDateFrequency] = useState<Dayjs>();

  return (
    <CalendarContext.Provider
      value={{
        dateData,
        end_date,
        eventData,
        setDateData,
        setEnd_date,
        setEventData,
        setStart_date,
        start_date,
        dateFrequency,
        setDateFrequency,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendarContext = () => useContext(CalendarContext);
