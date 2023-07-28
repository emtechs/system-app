import { apiUsingNow } from '.'
import { iSelectBase, iYear } from '../interfaces'

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

const listPeriod = async (query: string): Promise<iSelectBase[]> => {
  const { data: response } = await apiUsingNow.get<iSelectBase[]>(
    `/calendar/period${query}`,
  )

  return response
}

export const apiCalendar = { year, listYear, listPeriod }
