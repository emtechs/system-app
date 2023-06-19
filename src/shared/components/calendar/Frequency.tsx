import { useEffect, useMemo } from "react";
import {
  useAppThemeContext,
  useAuthContext,
  useCalendarContext,
  useClassContext,
  useFrequencyContext,
} from "../../contexts";
import { CalendarBase } from "./Base";
import { apiUsingNow } from "../../services";
import { iCalendar } from "../../interfaces";

export const CalendarFrequency = () => {
  const { setLoading } = useAppThemeContext();
  const { createFrequency } = useFrequencyContext();
  const { yearData, schoolData } = useAuthContext();
  const { classWithSchoolSelect } = useClassContext();
  const { monthData, setEventData } = useCalendarContext();
  const frequency = useMemo(() => {
    if (classWithSchoolSelect && schoolData && yearData) {
      const students = classWithSchoolSelect.students.map((el) => {
        return { student_id: el.student.id };
      });

      return {
        class_id: classWithSchoolSelect.class.id,
        school_id: schoolData.id,
        year_id: yearData.id,
        students,
      };
    }
    return undefined;
  }, [classWithSchoolSelect, schoolData, yearData]);

  useEffect(() => {
    setEventData(undefined);
  }, []);

  useEffect(() => {
    if (yearData && schoolData && classWithSchoolSelect && monthData) {
      const query = `?month=${monthData}`;
      setLoading(true);
      apiUsingNow
        .get<iCalendar[]>(
          `calendar/frequency/${yearData.id}/${schoolData.id}/${classWithSchoolSelect.class.id}${query}`
        )
        .then((res) => setEventData(res.data))
        .finally(() => setLoading(false));
    }
  }, [classWithSchoolSelect, schoolData, monthData, yearData]);

  return (
    <CalendarBase
      createFrequency={createFrequency}
      frequency={frequency}
      eventClick={(arg) => console.log(arg.event.start)}
    />
  );
};
