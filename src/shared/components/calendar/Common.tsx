import { useEffect } from "react";
import {
  useAppThemeContext,
  useAuthContext,
  useCalendarContext,
  useDrawerContext,
  usePaginationContext,
} from "../../contexts";
import { CalendarBase } from "./Base";
import { apiUsingNow } from "../../services";
import { iCalendar } from "../../interfaces";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/pt-br";
dayjs.extend(localizedFormat);

interface iCalendarDashCommonProps {
  onClick?: () => void;
}

export const CalendarDashCommon = ({ onClick }: iCalendarDashCommonProps) => {
  const navigate = useNavigate();
  const { setLoading } = useAppThemeContext();
  const { yearData, schoolData } = useAuthContext();
  const { monthData, setEventData, setDateData } = useCalendarContext();
  const { handleClickFrequency } = useDrawerContext();
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

  return (
    <CalendarBase
      eventClick={(arg) => {
        if (onClick) onClick();
        if (arg.event.classNames.includes("allFrequency")) {
          navigate(
            `/frequency/list?date=${dayjs(arg.event.start).format(
              "DD/MM/YYYY"
            )}`
          );
        } else {
          setDateData(dayjs(arg.event.start));
          navigate("/frequency");
        }
        handleClickFrequency();
      }}
      handleFrequency={onClick}
    />
  );
};
