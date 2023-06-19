import { useEffect } from "react";
import { useFormContext } from "react-hook-form-mui";
import { useCalendarContext, useFrequencyContext } from "../../contexts";
import { iClassDash } from "../../interfaces";

export const ValidateFrequency = () => {
  const { watch } = useFormContext();
  const { createFrequency } = useFrequencyContext();
  const { dateData, monthData } = useCalendarContext();
  const classData: iClassDash = watch("class");

  useEffect(() => {
    if (classData) {
      const students = classData.students.map(({ student }) => {
        return { student_id: student.id };
      });
      createFrequency({
        date: dateData.format("DD/MM/YYYY"),
        name: monthData,
        class_id: classData.class.id,
        school_id: classData.school.id,
        year_id: classData.year.id,
        students,
      });
    }
  }, [classData, dateData, monthData]);

  return <></>;
};
