import { apiUsingNow } from ".";
import { iYear } from "../interfaces";

const year = async (token: string, year: number): Promise<iYear> => {
  const { data: response } = await apiUsingNow.get<iYear>(
    `/calendar/year/${year}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response;
};

export const apiCalendar = { year };
