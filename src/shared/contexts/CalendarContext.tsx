import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { EventSourceInput } from "@fullcalendar/core/index.js";
import { iChildren } from "../interfaces";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/pt-br";
dayjs.extend(localizedFormat);

interface iCalendarContextData {
  dateData: string;
  setDateData: Dispatch<SetStateAction<string>>;
  eventData: EventSourceInput | undefined;
  setEventData: Dispatch<SetStateAction<EventSourceInput | undefined>>;
  start_date: string | undefined;
  setStart_date: Dispatch<SetStateAction<string | undefined>>;
  end_date: string;
  setEnd_date: Dispatch<SetStateAction<string>>;
  dateDisplay: string;
  setDateDisplay: Dispatch<SetStateAction<string>>;
}

const CalendarContext = createContext({} as iCalendarContextData);

export const CalendarProvider = ({ children }: iChildren) => {
  const [dateData, setDateData] = useState(dayjs().format("DD/MM/YYYY"));
  const [eventData, setEventData] = useState<EventSourceInput>();
  const [start_date, setStart_date] = useState<string>();
  const [end_date, setEnd_date] = useState(dayjs().format("DD/MM/YYYY"));
  const [dateDisplay, setDateDisplay] = useState(dayjs().format("dddd, LL"));

  return (
    <CalendarContext.Provider
      value={{
        dateData,
        dateDisplay,
        end_date,
        eventData,
        setDateData,
        setDateDisplay,
        setEnd_date,
        setEventData,
        setStart_date,
        start_date,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendarContext = () => useContext(CalendarContext);
