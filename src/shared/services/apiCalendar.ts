import { apiUsingNow } from '.'
import { iPeriod, iYear } from '../interfaces'

const listYear = async (): Promise<iYear[]> => {
  const { data: response } = await apiUsingNow.get<iYear[]>(`/calendar/year`)

  return response
}

const year = async (token: string, year: number): Promise<iYear> => {
  const { data: response } = await apiUsingNow.get<iYear>(
    `/calendar/year/${year}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  )

  return response
}

interface iListPeriodReturn {
  result: iPeriod[]
  total: number
}

const listPeriod = async (query: string): Promise<iListPeriodReturn> => {
  const { data: response } = await apiUsingNow.get<iListPeriodReturn>(
    `/calendar/period${query}`,
  )

  return response
}

export const apiCalendar = { year, listYear, listPeriod }
