import { z } from 'zod'
import { frequencyCreateSchema } from '../schemas'
import { iStudent } from './student.interface'

export type iFrequencyRequest = z.infer<typeof frequencyCreateSchema>

export type iStatusFrequency = 'OPENED' | 'CLOSED'

export type iStatusStudent = 'PRESENTED' | 'MISSED' | 'JUSTIFIED'

interface iUserFreq {
  id: string
  name: string
  cpf: string
}

export interface iFrequencyBase {
  id: string
  date: string
  status: iStatusFrequency
  created_at: Date
  finished_at: number
  infrequency: number
  total_students: number
  school: {
    id: string
    name: string
  }
  class: {
    id: string
    name: string
  }
}

interface iFrequencyInfreqBase extends iFrequencyBase {
  user: iUserFreq
  _count: { students: number }
  infreq?: number
  class_infreq?: number
  school_frequencies?: number
  school_infreq?: number
}

export interface iFrequencyStudentsBase {
  id: string
  status: iStatusStudent
  justification?: string
  updated_at?: string
  student: iStudent
}

export interface iFrequencyStudents extends iFrequencyStudentsBase {
  _count: { students: number }
}

export interface iFrequencyStudentsWithInfreq {
  id: string
  status: iStatusStudent
  justification?: string
  updated_at?: string
  name: string
  registry: string
  frequencyStudent_id: string
  presences: number
  justified: number
  absences: number
  frequencies: number
  infrequency: number
}

export interface iFrequency extends iFrequencyInfreqBase {
  students: iFrequencyStudents[]
}

export interface iFrequencyWithInfreq extends iFrequencyInfreqBase {
  students: iFrequencyStudentsWithInfreq[]
}

export interface iInfrequency {
  id: string
  name: string
  date_initial: Date
  date_final: Date
  value: number
  frequencies: number
  absences: number
  justified: number
  presences: number
}

type SortFrequencyHistory = 'RELEASED' | 'CHANGED' | 'APPROVED'

type StatusFrequencyHistory = 'ACCEPTED' | 'IN_ANALYSIS' | 'REFUSED'

export interface iFrequencyHistory {
  id: string
  sort: SortFrequencyHistory
  status: StatusFrequencyHistory
  status_student: iStatusStudent
  justification?: string
  created_at: number
  date: string
  student: {
    id: string
    name: string
    registry: string
  }
  school: {
    id: string
    name: string
  }
  class: {
    id: string
    name: string
  }
}
