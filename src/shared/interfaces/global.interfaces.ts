import { ReactNode, SyntheticEvent } from 'react'

export interface iChildren {
  children: ReactNode
}

export interface iDialogBaseProps {
  open: boolean
  onClose: () => void
}

export interface iLabelBaseProps {
  clickable?: boolean
  isSchool?: boolean
  to?: string
}

export interface iTabsBaseProps {
  value?: string | number
  handleChange: (_event: SyntheticEvent, newValue: string | number) => void
}

export interface iViewBaseProps {
  id?: string
}

export interface iSelectBase {
  id: string
  label: string
}

export interface iButtonBaseProps {
  title: string
  href?: string
  startIcon?: ReactNode
  endIcon?: ReactNode
  onClick?: () => void
  color?:
  | 'primary'
  | 'inherit'
  | 'secondary'
  | 'error'
  | 'info'
  | 'success'
  | 'warning'
}

export type iLinkComp = { component: 'div' } | object

export interface iPageProps {
  back?: string
}

export interface iHeadCell {
  order?: string
  numeric: 'right' | 'left'
  label: string
}

export interface iTable extends iChildren {
  headCells: iHeadCell[]
  message?: string
  link?: 'div'
}

export type iLocale = 'list' | 'data'
