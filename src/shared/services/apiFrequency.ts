import { FieldValues } from 'react-hook-form'
import {
  iFrequency,
  iFrequencyBase,
  iFrequencyHistory,
  iFrequencyStudentsBase,
  iMonth,
} from '../interfaces'
import { apiUsingNow } from './api'

const create = async (data: FieldValues): Promise<iFrequency> => {
  const { data: response } = await apiUsingNow.post<iFrequency>(
    'frequencies',
    data,
  )
  return response
}

interface iFreqUpdate {
  year_id: string
  class_id: string
  school_id: string
  students: { student_id: string }[]
  periods: { period_id: string }[]
  infrequency: number
}

const update = async (data: FieldValues, id: string): Promise<iFreqUpdate> => {
  const { data: response } = await apiUsingNow.patch<iFreqUpdate>(
    `frequencies/${id}`,
    data,
  )
  return response
}

const updateFreqStudent = async (
  data: FieldValues,
  id: string,
): Promise<{ frequency_id: string }> => {
  const { data: response } = await apiUsingNow.patch<{ frequency_id: string }>(
    `frequencies/student/${id}`,
    data,
  )
  return response
}

const destroy = async (id: string) => {
  await apiUsingNow.delete(`frequencies/${id}`)
}

interface iStudentsReturn {
  total: number
  frequency: iFrequencyBase
  result: iFrequencyStudentsBase[]
}

const students = async (
  id: string,
  query: string,
): Promise<iStudentsReturn> => {
  const { data: response } = await apiUsingNow.get<iStudentsReturn>(
    `frequencies/${id}/student${query}`,
  )
  return response
}

interface iList {
  total: number
  result: iFrequencyBase[]
  months: iMonth[]
}

const list = async (query: string): Promise<iList> => {
  const { data: response } = await apiUsingNow.get<iList>(`frequencies${query}`)
  return response
}

interface iHistoryReturn {
  result: iFrequencyHistory[]
  total: number
}

const history = async (query: string): Promise<iHistoryReturn> => {
  const { data: response } = await apiUsingNow.get<iHistoryReturn>(
    `frequencies/history${query}`,
  )
  return response
}

export const apiFrequency = {
  create,
  update,
  updateFreqStudent,
  destroy,
  students,
  list,
  history,
}
