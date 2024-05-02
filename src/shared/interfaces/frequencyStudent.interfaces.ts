export type iStatusStudent = 'PRESENTED' | 'MISSED' | 'JUSTIFIED'

export interface iFrequencyStudentsBase {
  id: string
  name: string
  registry: string
  status: iStatusStudent
  justification?: string
  updated_at?: string
  frequency_id: string
}

export interface iFrequencyDataStudent extends iFrequencyStudentsBase {
  is_loading: boolean
  is_error: boolean
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
