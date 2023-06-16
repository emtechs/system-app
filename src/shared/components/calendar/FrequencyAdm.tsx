import { useEffect, useMemo } from "react";
import {
  useAppThemeContext,
  useAuthContext,
  useCalendarContext,
  useClassContext,
  useFrequencyContext,
  useSchoolContext,
} from "../../contexts";
import { CalendarBase } from "./Base";
import { apiUsingNow } from "../../services";
import { iCalendar } from "../../interfaces";

export const CalendarFrequencyAdm = () => {
  const { setLoading } = useAppThemeContext();
  const { yearData } = useAuthContext();
  const { schoolSelect } = useSchoolContext();
  const { createFrequency } = useFrequencyContext();
  const { classWithSchoolSelect } = useClassContext();
  const { monthData, setEventData } = useCalendarContext();
  const frequency = useMemo(() => {
    if (classWithSchoolSelect && schoolSelect && yearData) {
      const students = classWithSchoolSelect.students.map((el) => {
        return { student_id: el.id };
      });

      return {
        class_id: classWithSchoolSelect.class.id,
        school_id: schoolSelect.id,
        year_id: yearData.id,
        students,
      };
    }
    return undefined;
  }, [classWithSchoolSelect, schoolSelect, yearData]);

  useEffect(() => {
    return () => setEventData(undefined);
  }, []);

  useEffect(() => {
    if (yearData && schoolSelect && classWithSchoolSelect && monthData) {
      const query = `?month=${monthData}`;
      setLoading(true);
      apiUsingNow
        .get<iCalendar[]>(
          `calendar/frequency/${yearData.id}/${schoolSelect.id}/${classWithSchoolSelect.class.id}${query}`
        )
        .then((res) => setEventData(res.data))
        .finally(() => setLoading(false));
    }
  }, [classWithSchoolSelect, schoolSelect, monthData, yearData]);

  return (
    <CalendarBase
      createFrequency={createFrequency}
      frequency={frequency}
      eventClick={(arg) => console.log(arg.event.start)}
    />
  );
};
