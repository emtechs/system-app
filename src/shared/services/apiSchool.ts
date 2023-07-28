import { FieldValues } from 'react-hook-form'
import { apiUsingNow } from './api'
import { iSchool } from '../interfaces'

const create = async (data: FieldValues): Promise<iSchool> => {
  const { data: response } = await apiUsingNow.post<iSchool>('schools', data)
  return response
}

const createServer = async (
  data: FieldValues,
  server_id: string,
): Promise<iSchool> => {
  const { data: response } = await apiUsingNow.post<iSchool>(
    'schools/' + server_id,
    data,
  )
  return response
}

const createClass = async (
  data: FieldValues,
  school_id: string,
  year_id: string,
): Promise<iSchool> => {
  const { data: response } = await apiUsingNow.post<iSchool>(
    `schools/${school_id}/${year_id}`,
    data,
  )
  return response
}

const impSchool = async (data: FormData): Promise<void> => {
  await apiUsingNow.post('imports/school', data)
}

const update = async (
  data: FieldValues,
  id: string,
  query?: string,
): Promise<iSchool> => {
  query = query || ''
  const { data: response } = await apiUsingNow.patch<iSchool>(
    `schools/${id}${query}`,
    data,
  )
  return response
}

const updateInfreq = async (data: FieldValues): Promise<iSchool> => {
  const { data: response } = await apiUsingNow.patch<iSchool>(
    `infrequency/school`,
    data,
  )
  return response
}

const deleteServer = async (school_id: string, server_id: string) => {
  await apiUsingNow.delete(`schools/${school_id}/server/${server_id}`)
}

interface iList {
  schools: iSchool[]
  total: number
  result: iSchool[]
}

const list = async (query: string): Promise<iList> => {
  const { data: response } = await apiUsingNow.get<iList>(`schools${query}`)

  return response
}

interface ilistServers {
  total: number
  result: iSchool[]
}

const listServers = async (query: string): Promise<ilistServers> => {
  const { data: response } = await apiUsingNow.get<ilistServers>(
    `schools/server${query}`,
  )

  return response
}

const retrieve = async (id: string, query: string): Promise<iSchool> => {
  const { data: response } = await apiUsingNow.get<iSchool>(
    `schools/${id}${query}`,
  )

  return response
}

export const apiSchool = {
  create,
  createClass,
  createServer,
  impSchool,
  update,
  updateInfreq,
  deleteServer,
  list,
  listServers,
  retrieve,
}
