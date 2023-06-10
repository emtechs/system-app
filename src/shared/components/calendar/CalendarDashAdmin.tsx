import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { EventSourceInput } from "@fullcalendar/core";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { apiUsingNow } from "../../services";
import { useAppThemeContext, useAuthContext } from "../../contexts";
import { iCalendar } from "../../interfaces";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

export const CalendarDashAdmin = () => {
  const theme = useTheme();
  const { setLoading } = useAppThemeContext();
  const { yearId } = useAuthContext();
  const [eventData, setEventData] = useState<EventSourceInput>();
  const [monthData, setMonthData] = useState<number>(dayjs().month() + 1);

  useEffect(() => {
    setLoading(true);
    apiUsingNow
      .get<iCalendar[]>(`calendar/${monthData}/${yearId}`)
      .then((res) => setEventData(res.data))
      .finally(() => setLoading(false));
  }, [monthData]);

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      locale="pt-br"
      height={theme.spacing(60)}
      titleFormat={{ month: "long" }}
      buttonText={{ today: "hoje" }}
      events={eventData}
      weekends={false}
      showNonCurrentDates={false}
      datesSet={(arg) => setMonthData(arg.start.getMonth() + 1)}
      eventClick={(arg) =>
        console.log(dayjs(arg.event.start).format("DD/MM/YYYY"))
      }
    />
  );
};
