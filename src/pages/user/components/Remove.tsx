import { useAppThemeContext, useSchoolContext } from "../../../shared/contexts";
import { iUser, iWorkSchool } from "../../../shared/interfaces";
import { DialogBase } from "../../../shared/components";

interface iRemoveProps {
  user: iUser;
  work: iWorkSchool;
  open: boolean;
  handleClose: () => void;
}

export const Remove = ({ handleClose, open, work, user }: iRemoveProps) => {
  const { rolePtBr } = useAppThemeContext();
  const { deleteServer } = useSchoolContext();

  return (
    <DialogBase
      open={open}
      onClose={handleClose}
      title="Remover Usuário da Função"
      description={`Deseja continuar removendo o usúario ${user.name.toUpperCase()} da
      Função ${rolePtBr(work.role).toUpperCase()} da Escola ${
        work.school.name
      }?`}
      action={() => {
        deleteServer(work.school.id, user.id);
        handleClose();
      }}
      actionTitle="Continuar"
    />
  );
};
