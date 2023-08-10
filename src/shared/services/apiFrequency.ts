import { FieldValues } from 'react-hook-form'
import {
  iFrequency,
  iFrequencyHistory,
  iFrequencyStudentsBase,
  iMonth,
  iRequest,
} from '../interfaces'
import { apiUsingNow } from './api'

const create = async (data: FieldValues): Promise<iFrequency> => {
  const { data: response } = await apiUsingNow.post<iFrequency>(
    'frequencies',
    data,
  )
  return response
}

const createRequest = async (data: FieldValues): Promise<iFrequency> => {
  const { data: response } = await apiUsingNow.post<iFrequency>(
    'frequencies/request',
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

const updateRequest = async (
  data: FieldValues,
  id: string,
): Promise<iFreqUpdate> => {
  const { data: response } = await apiUsingNow.patch<iFreqUpdate>(
    `frequencies/request/${id}`,
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

const retrieve = async (id: string): Promise<iFrequency> => {
  const { data: response } = await apiUsingNow.patch<iFrequency>(
    `frequencies/${id}`,
  )
  return response
}

const destroy = async (id: string) => {
  await apiUsingNow.delete(`frequencies/${id}`)
}

const destroyRequest = async (data: FieldValues) => {
  await apiUsingNow.delete('frequencies/request', {
    data: { ...data },
  })
}

interface iStudentsReturn {
  total: number
  result: iFrequencyStudentsBase[]
  frequency: iFrequency
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
  result: iFrequency[]
  months: iMonth[]
}

const list = async (query: string): Promise<iList> => {
  const { data: response } = await apiUsingNow.get<iList>(`frequencies${query}`)
  return response
}

interface iListRequest {
  total: number
  result: iRequest[]
}

const listRequest = async (): Promise<iListRequest> => {
  const { data: response } = await apiUsingNow.get<iListRequest>(
    'frequencies/request',
  )
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
  createRequest,
  update,
  updateRequest,
  updateFreqStudent,
  destroy,
  destroyRequest,
  students,
  list,
  listRequest,
  history,
  retrieve,
}
