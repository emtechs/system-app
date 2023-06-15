import { useEffect } from "react";
import {
  useAppThemeContext,
  useAuthContext,
  useCalendarContext,
} from "../../contexts";
import { iCalendar } from "../../interfaces";
import { apiUsingNow } from "../../services";
import { CalendarBase } from "./Base";

export const CalendarDashAdmin = () => {
  const { setLoading } = useAppThemeContext();
  const { yearData } = useAuthContext();
  const { start_date, end_date, setEventData } = useCalendarContext();

  useEffect(() => {
    if (yearData && start_date) {
      const query = `?end_date=${end_date}&start_date=${start_date}`;
      setLoading(true);
      apiUsingNow
        .get<iCalendar[]>(`calendar/${yearData.id}${query}`)
        .then((res) => setEventData(res.data))
        .finally(() => setLoading(false));
    }
  }, [start_date, end_date, yearData]);

  return <CalendarBase eventClick={(arg) => console.log(arg.event.start)} />;
};
