import { Breadcrumbs } from '@mui/material'
import { Home } from '@mui/icons-material'
import { iChildren } from '../../interfaces'
import { LinkChip } from '../link'
import { useDrawerContext } from '../..'

export const TitleBasePage = ({ children }: iChildren) => {
  const { handleClickTools } = useDrawerContext()

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <LinkChip
        icon={<Home sx={{ mr: 0.5 }} fontSize="inherit" />}
        label="Página Inicial"
        onClick={handleClickTools}
      />
      {children}
    </Breadcrumbs>
  )
}
