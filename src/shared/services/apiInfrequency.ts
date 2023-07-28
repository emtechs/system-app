import { FieldValues } from 'react-hook-form'
import { iInfrequency } from '../interfaces'
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

export const apiInfrequency = {
  update,
  list,
}
