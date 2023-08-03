import { FieldValues } from 'react-hook-form'
import {
  iDataInfrequency,
  iReportClass,
  iReportSchool,
  iReportStudent,
} from '../interfaces'
import { apiUsingNow } from './api'

const school = async (
  id: string,
  year_id: string,
  query: string,
): Promise<iDataInfrequency[]> => {
  const { data: response } = await apiUsingNow.get<iDataInfrequency[]>(
    `infrequencies/school/${id}/${year_id}${query}`,
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

const reportSchool = async (data: FieldValues): Promise<iReportSchool> => {
  const { data: response } = await apiUsingNow.post<iReportSchool>(
    'infrequencies/report/school',
    data,
  )
  return response
}

const reportStudent = async (data: FieldValues): Promise<iReportStudent> => {
  const { data: response } = await apiUsingNow.post<iReportStudent>(
    'infrequencies/report/student',
    data,
  )
  return response
}

export const apiInfrequency = {
  school,
  reportClass,
  reportSchool,
  reportStudent,
}
