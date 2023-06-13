import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import {
  useAppThemeContext,
  useAuthContext,
  useCalendarContext,
} from "../../contexts";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/pt-br";
import { EventClickArg } from "@fullcalendar/core/index.js";
dayjs.extend(localizedFormat);

interface iCalendarBaseProps {
  navLinks?: boolean;
  eventClick?: (arg: EventClickArg) => void;
}

export const CalendarBase = ({ navLinks, eventClick }: iCalendarBaseProps) => {
  const { theme } = useAppThemeContext();
  const { yearData } = useAuthContext();
  const { eventData, setEnd_date, setStart_date, setDateDisplay, setDateData } =
    useCalendarContext();
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
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
      navLinks={navLinks}
      navLinkDayClick={(date) => {
        setDateData(dayjs(date).format("DD/MM/YYYY"));
        setDateDisplay(dayjs(date).format("dddd, LL"));
      }}
      eventClick={eventClick}
    />
  );
};
