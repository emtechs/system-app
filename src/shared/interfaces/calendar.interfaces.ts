export interface iMonth {
  id: string
  name: string
  month: number
}

export interface iYear {
  id: string
  year: string
}

export interface iCalendar {
  title: string
  date: string
  display: 'list-item'
  color: string
}

export type iCategory = 'BIMESTRE' | 'SEMESTRE' | 'ANO'

export interface iPeriod {
  id: string
  name: string
  label: string
  category: iCategory
  date_initial: Date
  date_final: Date
  year: iYear
}
