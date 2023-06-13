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
    if (yearData) {
      let query = `?end_date=${end_date}`;
      if (start_date) {
        query += `&start_date=${start_date}`;
      } else {
        query += "&take=0";
      }
      setLoading(true);
      apiUsingNow
        .get<iCalendar[]>(`calendar/${yearData.id}${query}`)
        .then((res) => setEventData(res.data))
        .finally(() => setLoading(false));
    }
  }, [start_date, end_date, yearData]);

  return <CalendarBase eventClick={(arg) => console.log(arg.event.start)} />;
};
