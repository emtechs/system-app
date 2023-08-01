import { Breadcrumbs } from '@mui/material'
import { Home } from '@mui/icons-material'
import { useAppThemeContext, useDrawerContext } from '../../contexts'
import { iChildren } from '../../interfaces'
import { LinkChip } from '../link'

export const TitleBaseItemsPage = ({ children }: iChildren) => {
  const { mdDown } = useAppThemeContext()
  const { handleClickTools } = useDrawerContext()

  return (
    <Breadcrumbs maxItems={mdDown ? 2 : undefined} aria-label="breadcrumb">
      <LinkChip
        icon={<Home sx={{ mr: 0.5 }} fontSize="inherit" />}
        label={mdDown ? '...' : 'Página Inicial'}
        onClick={handleClickTools}
      />
      {children}
    </Breadcrumbs>
  )
}
