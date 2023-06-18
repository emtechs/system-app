import { useEffect } from "react";
import {
  useAppThemeContext,
  useAuthContext,
  useCalendarContext,
  useSchoolContext,
  useTableContext,
} from "../../contexts";
import { CalendarBase } from "./Base";
import { apiUsingNow } from "../../services";
import { iCalendar } from "../../interfaces";

export const CalendarDashSchool = () => {
  const { setLoading } = useAppThemeContext();
  const { yearData } = useAuthContext();
  const { schoolSelect } = useSchoolContext();
  const { monthData, setEventData } = useCalendarContext();
  const { defineQuery } = useTableContext();

  useEffect(() => {
    return () => setEventData(undefined);
  }, []);

  useEffect(() => {
    if (yearData && schoolSelect && monthData) {
      const query = defineQuery(
        undefined,
        schoolSelect.id,
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
  }, [schoolSelect, monthData, yearData, defineQuery]);

  return <CalendarBase />;
};
