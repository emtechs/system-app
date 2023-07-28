import { useDialogContext } from '../../../contexts'
import { DialogBase } from './Base'

interface iDialogActiveProps {
  is_active: boolean
  title: string
  description: string
  action: () => void
}

export const DialogActive = ({
  action,
  description,
  is_active,
  title,
}: iDialogActiveProps) => {
  const { openActive, handleOpenActive } = useDialogContext()

  return is_active ? (
    <DialogBase
      open={openActive}
      onClose={handleOpenActive}
      title={`Desativar ${title}`}
      description={`Deseja continuar desativando ${description}?`}
      action={action}
      actionTitle="Continuar"
    />
  ) : (
    <DialogBase
      open={openActive}
      onClose={handleOpenActive}
      title={`Ativar ${title}`}
      description={`Deseja continuar ativando ${description}?`}
      action={action}
      actionTitle="Continuar"
    />
  )
}
