import { Workspaces } from '@mui/icons-material'
import { TitleBaseItemsPage, LinkChip, LabelYear } from '../../../../shared'

export const TitleClassYearPage = () => {
  return (
    <TitleBaseItemsPage>
      <LinkChip
        label="Turmas"
        icon={<Workspaces sx={{ mr: 0.5 }} fontSize="inherit" />}
        to="/class"
      />
      <LabelYear />
    </TitleBaseItemsPage>
  )
}
