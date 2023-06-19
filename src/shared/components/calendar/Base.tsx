import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventClickArg } from "@fullcalendar/core/index.js";
import { useAuthContext, useCalendarContext } from "../../contexts";
import { FieldValues } from "react-hook-form";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/pt-br";
dayjs.extend(localizedFormat);

interface iCalendarBaseProps {
  eventClick?: (arg: EventClickArg) => void;
  createFrequency?: (data: FieldValues) => Promise<void>;
  frequency?: {
    class_id: string;
    school_id: string;
    year_id: string;
    students: {
      student_id: string;
    }[];
  };
}

export const CalendarBase = ({
  eventClick,
  createFrequency,
  frequency,
}: iCalendarBaseProps) => {
  const { yearData } = useAuthContext();
  const { eventData, setDateData, monthData, setMonthData } =
    useCalendarContext();

  return (
    <FullCalendar
      plugins={[interactionPlugin, dayGridPlugin]}
      initialView="dayGridMonth"
      locale="pt-br"
      validRange={{
        start: `${yearData?.year}-01-01`,
        end: dayjs().format(),
      }}
      height="auto"
      titleFormat={{ month: "long" }}
      buttonText={{ today: dayjs().format("MMMM") }}
      events={eventData}
      showNonCurrentDates={false}
      weekends={false}
      datesSet={(arg) => {
        setMonthData(arg.view.title);
      }}
      dayCellClassNames={(arg) => {
        const date = eventData?.filter(
          (el) => el.date === dayjs(arg.date).format("YYYY-MM-DD")
        );

        return date?.length === 0 ? "calendar_cursor_pointer" : "";
      }}
      eventClassNames="calendar_cursor_pointer"
      eventClick={eventClick}
      eventOrder="start"
      eventOrderStrict={true}
      selectOverlap={false}
      dateClick={(arg) => {
        const date = eventData?.filter(
          (el) => el.date === dayjs(arg.date).format("YYYY-MM-DD")
        );
        if (date?.length === 0) {
          const dateData = dayjs(arg.date).format("DD/MM/YYYY");

          if (createFrequency && frequency) {
            createFrequency({
              date: dateData,
              name: monthData,
              ...frequency,
            });
          }
          setDateData(dateData);
        }
      }}
    />
  );
};
