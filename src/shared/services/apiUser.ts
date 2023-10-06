import { FieldValues } from 'react-hook-form'
import { apiUsingNow } from './api'
import {
  iPeriod,
  iSchool,
  iSchoolServer,
  iUser,
  iUserProfile,
  iWorkSchool,
} from '../interfaces'

const create = async (
  data: FieldValues,
  queryData?: string,
): Promise<iUser> => {
  const query = queryData || ''
  const { data: response } = await apiUsingNow.post<iUser>(
    'users' + query,
    data,
  )
  return response
}

const createServer = async (
  data: FieldValues,
  school_id: string,
): Promise<iSchoolServer> => {
  const { data: response } = await apiUsingNow.post<iSchoolServer>(
    `users?school_id=${school_id}`,
    data,
  )
  return response
}

const retrieve = async (id: string, query: string): Promise<iUser> => {
  const { data: response } = await apiUsingNow.get<iUser>(`users/${id}${query}`)
  return response
}

interface iPageReturn {
  user: iUser
  periods: iPeriod[]
}

const page = async (query: string): Promise<iPageReturn> => {
  const { data: response } = await apiUsingNow.get<iPageReturn>(
    `users/page${query}`,
  )
  return response
}

const profile = async (token: string): Promise<iUserProfile> => {
  const { data: response } = await apiUsingNow.get<iUserProfile>(
    'users/profile',
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  )
  return response
}

const refresh = async (): Promise<iUserProfile> => {
  const { data: response } =
    await apiUsingNow.get<iUserProfile>('users/profile')
  return response
}

interface iListReturn {
  total: number
  result: iUser[]
}

const list = async (query: string): Promise<iListReturn> => {
  const { data: response } = await apiUsingNow.get<iListReturn>(`users${query}`)
  return response
}

const update = async (id: string, data: FieldValues): Promise<iUser> => {
  const { data: response } = await apiUsingNow.patch<iUser>(`users/${id}`, data)
  return response
}

interface iSchoolReturn {
  schools: iSchool[]
  total: number
  result: iWorkSchool[]
}

const schools = async (query: string) => {
  const { data: response } = await apiUsingNow.get<iSchoolReturn>(
    `users/schools${query}`,
  )
  return response
}

const destroy = async (login: string) => {
  await apiUsingNow.delete(`users/${login}`)
}

export const apiUser = {
  create,
  createServer,
  page,
  profile,
  refresh,
  update,
  schools,
  retrieve,
  list,
  destroy,
}
