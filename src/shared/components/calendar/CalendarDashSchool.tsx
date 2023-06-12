import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { EventSourceInput } from "@fullcalendar/core";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts";

export const CalendarDashSchool = () => {
  const theme = useTheme();
  const { yearData } = useAuthContext();
  const [eventData, setEventData] = useState<EventSourceInput>();
  const [monthData, setMonthData] = useState<number>();

  const defineColor = (infreq: number) => {
    if (infreq <= 30) {
      return theme.palette.success.main;
    }
    if (infreq <= 65) {
      return theme.palette.warning.main;
    }
    return theme.palette.error.main;
  };

  useEffect(() => {
    if (monthData === 5) {
      setEventData([
        {
          title: "80%",
          date: "2023-05-05",
          display: "list-item",
          color: defineColor(80),
        },
        {
          title: "30%",
          date: "2023-05-10",
          display: "list-item",
          color: defineColor(30),
        },
        {
          title: "50%",
          date: "2023-05-15",
          display: "list-item",
          color: defineColor(50),
        },
      ]);
    }
    if (monthData === 6) {
      setEventData([
        {
          title: "80%",
          date: "2023-06-05",
          display: "list-item",
          color: defineColor(80),
        },
        {
          title: "30%",
          date: "2023-06-13",
          display: "list-item",
          color: defineColor(30),
        },
        {
          title: "50%",
          date: "2023-06-15",
          display: "list-item",
          color: defineColor(50),
        },
      ]);
    }
  }, [monthData]);

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      validRange={{
        start: `${yearData?.year}-01-01`,
        end: `${yearData?.year}-12-31`,
      }}
      locale="pt-br"
      height={theme.spacing(60)}
      titleFormat={{ month: "long" }}
      events={eventData}
      weekends={false}
      showNonCurrentDates={false}
      datesSet={(arg) => setMonthData(arg.start.getMonth() + 1)}
    />
  );
};
