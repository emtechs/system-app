import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { iCalendar, iChildren, iSelectBase } from "../interfaces";
import { useAppThemeContext } from "./ThemeContext";
import { apiAuth } from "../services";
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
  verifyYear: (id?: string, year?: string) => void;
  yearSelect: iSelectBase | undefined;
}

const CalendarContext = createContext({} as iCalendarContextData);

export const CalendarProvider = ({ children }: iChildren) => {
  const navigate = useNavigate();
  const { setLoading } = useAppThemeContext();
  const [dateData, setDateData] = useState<Dayjs>(dayjs());
  const [eventData, setEventData] = useState<iCalendar[]>();
  const [monthData, setMonthData] = useState(dayjs().format("MMMM"));
  const [yearSelect, setYearSelect] = useState<iSelectBase>();

  const verifyYear = useCallback((id?: string, year?: string) => {
    let query = "";
    if (id) query = `?year_id=${id}`;
    if (year) query = `?year=${year}`;
    setLoading(true);
    apiAuth
      .verify(query)
      .then((res) => setYearSelect(res.select))
      .catch(() => navigate("/"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <CalendarContext.Provider
      value={{
        dateData,
        eventData,
        setDateData,
        setEventData,
        monthData,
        setMonthData,
        verifyYear,
        yearSelect,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendarContext = () => useContext(CalendarContext);
