import { DialogBase } from "./Base";

interface iDialogActiveProps {
  is_active: boolean;
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  action: () => void;
}

export const DialogActive = ({
  action,
  description,
  is_active,
  onClose,
  open,
  title,
}: iDialogActiveProps) => {
  return is_active ? (
    <DialogBase
      open={open}
      onClose={onClose}
      title={`Desativar ${title}`}
      description={`Deseja continuar desativando ${description}?`}
      action={action}
      actionTitle="Continuar"
    />
  ) : (
    <DialogBase
      open={open}
      onClose={onClose}
      title={`Ativar ${title}`}
      description={`Deseja continuar ativando ${description}?`}
      action={action}
      actionTitle="Continuar"
    />
  );
};
