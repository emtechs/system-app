import { iYear } from './calendar.interfaces'

export type iReport = 'school' | 'class' | 'student'

interface iDataBase {
  id: string
  name: string
}

interface iDataReportClass {
  id: string
  name: string
  school: iDataBase
  year: iYear
  students: number
  frequencies: number
  infrequency: number
  period: {
    category: string
    id: string
    name: string
  }
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
  year: iYear
  students: number
  frequencies: number
  infrequency: number
  classes: number
  type: 'detalhado' | 'resumido'
  period: {
    category: string
    id: string
    name: string
  }
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
  year: iYear
  frequencies: number
  infrequency: number
  presences: number
  justified: number
  absences: number
  period: {
    category: string
    id: string
    name: string
  }
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
