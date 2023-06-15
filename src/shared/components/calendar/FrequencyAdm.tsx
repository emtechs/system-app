import { useEffect } from "react";
import {
  useAppThemeContext,
  useAuthContext,
  useCalendarContext,
  useClassContext,
  useSchoolContext,
} from "../../contexts";
import { CalendarBase } from "./Base";
import { apiUsingNow } from "../../services";
import { iCalendar } from "../../interfaces";

export const CalendarFrequencyAdm = () => {
  const { setLoading } = useAppThemeContext();
  const { yearData } = useAuthContext();
  const { schoolSelect } = useSchoolContext();
  const { classWithSchoolSelect } = useClassContext();
  const { start_date, end_date, setEventData } = useCalendarContext();

  useEffect(() => {
    return () => setEventData(undefined);
  }, []);

  useEffect(() => {
    if (yearData && schoolSelect && classWithSchoolSelect && start_date) {
      const query = `?end_date=${end_date}&start_date=${start_date}`;
      setLoading(true);
      apiUsingNow
        .get<iCalendar[]>(
          `calendar/frequency/${yearData.id}/${schoolSelect.id}/${classWithSchoolSelect.class.id}${query}`
        )
        .then((res) => setEventData(res.data))
        .finally(() => setLoading(false));
    }
  }, [classWithSchoolSelect, schoolSelect, start_date, end_date, yearData]);

  return <CalendarBase eventClick={(arg) => console.log(arg.event.start)} />;
};
