import { apiUsingNow } from './api'
import { iSchoolClass, iSchoolUser } from '../interfaces'

interface iClassDataReturn {
  total: number
  result: iSchoolClass[]
}

const classData = async (
  id: string,
  queryData: string,
): Promise<iClassDataReturn> => {
  const query = `?view=class${queryData}`
  const { data: response } = await apiUsingNow.get<iClassDataReturn>(
    `schools/${id}${query}`,
  )

  return response
}

interface iServerReturn {
  total: number
  result: iSchoolUser[]
}

const server = async (
  id: string,
  queryData: string,
): Promise<iServerReturn> => {
  const query = `?view=server${queryData}`
  const { data: response } = await apiUsingNow.get<iServerReturn>(
    `schools/${id}${query}`,
  )

  return response
}

export const apiSchoolRetrieve = { classData, server }
