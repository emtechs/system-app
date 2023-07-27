import { FieldValues } from 'react-hook-form'
import { apiUsingNow } from './api'
import {
  iClass,
  iClassDash,
  iClassSchoolRequest,
  iStudent,
  iYear,
} from '../interfaces'

const create = async (data: FieldValues): Promise<iClass> => {
  const { data: response } = await apiUsingNow.post<iClass>('classes', data)
  return response
}

const createSchool = async (data: iClassSchoolRequest): Promise<iClass> => {
  const { data: response } = await apiUsingNow.post<iClass>(
    'classes/school',
    data,
  )
  return response
}

const createStudent = async (data: FieldValues): Promise<iClass> => {
  const { data: response } = await apiUsingNow.post<iClass>(
    'classes/student',
    data,
  )
  return response
}

const impClass = async (data: FormData): Promise<void> => {
  await apiUsingNow.post('imports/class', data)
}

const updateSchool = async (data: FieldValues): Promise<iClass> => {
  const { data: response } = await apiUsingNow.patch<iClass>('classes', data)
  return response
}

interface ilistReturn {
  classes: iClass[]
  total: number
  result: iClass[]
  years: iYear[]
}

const list = async (query: string): Promise<ilistReturn> => {
  const { data: response } = await apiUsingNow.get<ilistReturn>(
    `classes${query}`,
  )

  return response
}

interface iClassYearReturn {
  classes: iClass[]
  total: number
  result: iClass[]
}

const listClass = async (query: string): Promise<iClassYearReturn> => {
  const { data: response } = await apiUsingNow.get<iClassYearReturn>(
    `classes/year/${query}`,
  )

  return response
}

interface ilistDash {
  classes: iClassDash[]
  total: number
  result: iClassDash[]
}

const listDash = async (school_id: string, year_id: string, query: string) => {
  const { data: response } = await apiUsingNow.get<ilistDash>(
    `classes/school/${school_id}/dash/${year_id}${query}`,
  )

  return response
}

const retrieve = async (id: string) => {
  const { data: response } = await apiUsingNow.get<iClass>(`classes/${id}`)

  return response
}

const destroy = async (id: string, data: FieldValues) => {
  const { data: response } = await apiUsingNow.delete<iClass>(`classes/${id}`, {
    data: { ...data },
  })

  return response
}

const transfer = async (data: FieldValues) => {
  const { data: response } = await apiUsingNow.patch<iClass>(
    `classes/transfer`,
    data,
  )

  return response
}

interface ilistYearReturn {
  total: number
  result: iStudent[]
}

const listYear = async (key: string, query: string) => {
  const { data: response } = await apiUsingNow.get<ilistYearReturn>(
    `classes/year/${key}${query}`,
  )

  return response
}

export const apiClass = {
  create,
  createSchool,
  createStudent,
  impClass,
  updateSchool,
  listClass,
  listDash,
  list,
  retrieve,
  destroy,
  transfer,
  listYear,
}
