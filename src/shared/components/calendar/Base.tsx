import { useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventClickArg } from "@fullcalendar/core/index.js";
import {
  useAppThemeContext,
  useAuthContext,
  useCalendarContext,
} from "../../contexts";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/pt-br";
dayjs.extend(localizedFormat);

interface iCalendarBaseProps {
  eventClick?: (arg: EventClickArg) => void;
}

export const CalendarBase = ({ eventClick }: iCalendarBaseProps) => {
  const { theme } = useAppThemeContext();
  const { yearData } = useAuthContext();
  const {
    eventData,
    setEnd_date,
    setStart_date,
    setDateData,
    setDateFrequency,
  } = useCalendarContext();

  useEffect(() => {
    return () => {
      setDateFrequency(undefined);
    };
  }, []);

  return (
    <FullCalendar
      plugins={[interactionPlugin, dayGridPlugin]}
      initialView="dayGridMonth"
      locale="pt-br"
      validRange={{
        start: `${yearData?.year}-01-01`,
        end: dayjs().format(),
      }}
      height={theme.spacing(60)}
      titleFormat={{ month: "long" }}
      buttonText={{ today: dayjs().format("MMMM") }}
      events={eventData}
      weekends={false}
      datesSet={(arg) => {
        setStart_date(dayjs(arg.start).format("DD/MM/YYYY"));
        setEnd_date(dayjs(arg.end).format("DD/MM/YYYY"));
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
          setDateFrequency(dayjs(arg.date));
          setDateData(dayjs(arg.date).format("DD/MM/YYYY"));
        }
      }}
    />
  );
};
