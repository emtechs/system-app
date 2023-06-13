import { useEffect } from "react";
import {
  useAppThemeContext,
  useAuthContext,
  useCalendarContext,
} from "../../contexts";
import { CalendarBase } from "./Base";
import { apiUsingNow } from "../../services";
import { iCalendar } from "../../interfaces";

export const CalendarDashCommon = () => {
  const { setLoading } = useAppThemeContext();
  const { yearData, schoolData } = useAuthContext();
  const { start_date, end_date, setEventData } = useCalendarContext();

  useEffect(() => {
    if (yearData && schoolData) {
      let query = `?end_date=${end_date}&school_id=${schoolData.school.id}`;
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
  }, [schoolData, start_date, end_date, yearData]);

  return <CalendarBase navLinks />;
};
