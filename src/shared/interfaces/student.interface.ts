import { z } from 'zod'
import { studentRemoveSchema, studentTransferSchema } from '../schemas'
import { iClass, iClassFreq } from './class.interfaces'

export interface iStudent {
  id: string
  name: string
  registry: string
  class: {
    id: string
    name: string
  }
  school: {
    id: string
    name: string
  }
  year_id: string
  key: string
}

export interface iStudentResume {
  id: string
  name: string
  registry: string
  class: {
    id: string
    name: string
  }
  frequencies: number
  infrequency: number
  absences: number
}

export interface iStudentClass {
  student: {
    id: string
    name: string
    registry: string
  }
}

export interface iStudentList extends iStudent {
  classes?: { class: iClassFreq }[]
}

export interface iStudentFrequency extends iStudent {
  frequencies: {
    presented: number
    justified: number
    missed: number
    total: number
  }
  infrequency: number
}

export interface iStudentDash extends iStudentFrequency {
  class: iClass
}

export type iStudentRemoveRequest = z.infer<typeof studentRemoveSchema>

export type iStudentTransferRequest = z.infer<typeof studentTransferSchema>
