import { z } from 'zod'
import {
  frequencyCreateSchema,
  iFrequencyStudentsWithInfreq,
  iStatusStudent,
} from '../../shared'

export type iFrequencyRequest = z.infer<typeof frequencyCreateSchema>

interface iUserFreq {
  id: string
  name: string
  cpf: string
}

export interface iResumeFreq {
  id: string
  name: string
  prc: number
}

interface iDataFreq {
  id: string
  name: string
}

export interface iFrequency {
  id: string
  date: string
  date_time: Date
  is_open: boolean
  created_at: Date
  finished_at: number
  infrequency: number
  total_students: number
  school: iDataFreq
  class: iDataFreq
  user: iDataFreq
}

interface iFrequencyInfreqBase extends iFrequency {
  user: iUserFreq
  _count: { students: number }
  infreq?: number
  class_infreq?: number
  school_frequencies?: number
  school_infreq?: number
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

export interface iRequest {
  id: string
  description: string
  justification: string
  created_at: Date
  user: iDataFreq
}
