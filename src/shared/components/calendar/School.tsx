import { useEffect } from "react";
import {
  useAppThemeContext,
  useAuthContext,
  useCalendarContext,
  usePaginationContext,
} from "../../contexts";
import { CalendarBase } from "./Base";
import { apiUsingNow } from "../../services";
import { iCalendar } from "../../interfaces";

export const CalendarDashSchool = () => {
  const { setLoading } = useAppThemeContext();
  const { yearData, schoolData } = useAuthContext();
  const { monthData, setEventData } = useCalendarContext();
  const { defineQuery } = usePaginationContext();

  useEffect(() => {
    setEventData(undefined);
  }, []);

  useEffect(() => {
    if (yearData && schoolData && monthData) {
      const query = defineQuery(
        undefined,
        schoolData.id,
        undefined,
        undefined,
        monthData
      );
      setLoading(true);
      apiUsingNow
        .get<iCalendar[]>(`calendar/${yearData.id}${query}`)
        .then((res) => setEventData(res.data))
        .finally(() => setLoading(false));
    }
  }, [schoolData, monthData, yearData, defineQuery]);

  return <CalendarBase />;
};
