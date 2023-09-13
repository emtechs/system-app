import { useNavigate } from 'react-router-dom'
import {
  DialogBaseChildrenAction,
  iDialogBaseProps,
  useSchoolContext,
} from '../../../../shared'
import { TableDashboardSchoolResumePage } from '../table'

export const DialogDashboardSchoolResumePage = ({
  open,
  onClose,
}: iDialogBaseProps) => {
  const navigate = useNavigate()
  const { schoolSelect } = useSchoolContext()

  return (
    <DialogBaseChildrenAction
      open={open}
      onClose={onClose}
      title="Alunos Faltosos"
      description={
        'Aqui está um resumo da lista dos alunos com maior número de faltas. Clique em "Veja Mais" para acessar a lista completa.'
      }
      action={() => navigate(`/${schoolSelect?.id}/student?view=absences`)}
      actionTitle="Veja Mais"
    >
      <TableDashboardSchoolResumePage />
    </DialogBaseChildrenAction>
  )
}
