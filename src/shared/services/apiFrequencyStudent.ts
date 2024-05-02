import { FieldValues } from 'react-hook-form'
import { iFrequency, iFrequencyStudentsBase } from '../interfaces'
import { apiUsingNow } from './api'

const update = async (
  data: FieldValues,
  id: string,
): Promise<iFrequencyStudentsBase> => {
  const { data: response } = await apiUsingNow.patch<iFrequencyStudentsBase>(
    `frequencystudent/${id}`,
    data,
  )
  return response
}

interface iList {
  total: number
  result: iFrequencyStudentsBase[]
  frequency: iFrequency
}

const list = async (query: string): Promise<iList> => {
  const { data: response } = await apiUsingNow.get<iList>(
    `frequencystudent${query}`,
  )
  return response
}

export const apiFrequencyStudent = {
  update,
  list,
}
