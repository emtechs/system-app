import { Breadcrumbs } from '@mui/material'
import { Home } from '@mui/icons-material'
import { iChildren } from '../../interfaces'
import { LinkChip } from '../link'

export const TitleBasePage = ({ children }: iChildren) => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <LinkChip
        icon={<Home sx={{ mr: 0.5 }} fontSize="inherit" />}
        label="Página Inicial"
      />
      {children}
    </Breadcrumbs>
  )
}
