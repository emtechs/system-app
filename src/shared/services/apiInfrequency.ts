import { FieldValues } from 'react-hook-form'
import { iInfrequency, iPeriod, iReportClass } from '../interfaces'
import { apiUsingNow } from './api'

const update = async (data: FieldValues, id: string): Promise<void> => {
  await apiUsingNow.patch(`infrequencies/${id}`, data)
}

interface iInfrequencyReturn {
  result: iInfrequency[]
  total: number
}

const list = async (query: string): Promise<iInfrequencyReturn> => {
  const { data: response } = await apiUsingNow.get<iInfrequencyReturn>(
    `infrequencies${query}`,
  )
  return response
}

interface iListClassReturn {
  periods: iPeriod[]
  total: number
}

const listClass = async (query: string): Promise<iListClassReturn> => {
  const { data: response } = await apiUsingNow.get<iListClassReturn>(
    `infrequencies/class${query}`,
  )
  return response
}

const reportClass = async (data: FieldValues): Promise<iReportClass> => {
  const { data: response } = await apiUsingNow.post<iReportClass>(
    'infrequencies/report/class',
    data,
  )
  return response
}

export const apiInfrequency = {
  update,
  list,
  listClass,
  reportClass,
}
