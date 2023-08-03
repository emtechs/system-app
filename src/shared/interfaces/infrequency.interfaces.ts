import { iPeriod } from './calendar.interfaces'

export type iReport = 'school' | 'class' | 'student'

interface iDataBase {
  id: string
  name: string
}

export interface iDataInfrequency extends iDataBase {
  infrequency: number
  frequencies: number
}

interface iDataReportClass {
  id: string
  name: string
  school: iDataBase
  students: number
  frequencies: number
  infrequency: number
  period: iPeriod
}

interface iStudentReportClass {
  id: string
  name: string
  registry: string
  created_at: Date
  infrequency: number
  presences: number
  justified: number
  absences: number
  frequencies: number
}

export interface iReportClass {
  result: iDataReportClass
  students: iStudentReportClass[]
}

interface iDataReportSchool {
  id: string
  name: string
  director?: iDataBase
  students: number
  frequencies: number
  infrequency: number
  classes: number
  type: 'detalhado' | 'resumido'
  period: iPeriod
}

export interface iReportSchool {
  result: iDataReportSchool
  classes: { result: iDataReportClass; students?: iStudentReportClass[] }[]
}

interface iDataReportStudent {
  id: string
  name: string
  registry: string
  class: iDataBase
  school: iDataBase
  frequencies: number
  infrequency: number
  presences: number
  justified: number
  absences: number
  period: iPeriod
}

interface iFrequencyReportStudent {
  id: string
  date: string
  status: string
  justification?: string
  user: iDataBase
}

export interface iReportStudent {
  result: iDataReportStudent
  frequencies: iFrequencyReportStudent[]
}
