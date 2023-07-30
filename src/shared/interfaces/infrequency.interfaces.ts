import { iYear } from './calendar.interfaces'

interface iDataReportClass {
  id: string
  name: string
  school: {
    id: string
    name: string
  }
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
