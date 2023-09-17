import { z } from 'zod'
import { ReactNode, SyntheticEvent } from 'react'
import { avatarSchema } from '../schemas'

export interface iChildren {
  children: ReactNode
}

export interface iDialogBaseProps {
  open: boolean
  onClose: () => void
}

export interface iDialogDataProps {
  getData?: () => void
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
  is_open?: boolean
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

export interface iTableBase extends iChildren {
  headCells: iHeadCell[]
}

export interface iTable extends iTableBase {
  message?: string
  link?: 'div'
  isCount?: boolean
}

export type iLocale = 'list' | 'data'

export type iAvatarRequest = z.infer<typeof avatarSchema>
