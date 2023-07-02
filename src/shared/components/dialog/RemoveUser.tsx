import { useSchoolContext } from "../../contexts";
import { iUser, iWorkSchool } from "../../interfaces";
import { rolePtBr } from "../../scripts";
import { DialogBase } from "./structure";

interface iRemoveProps {
  user: iUser;
  work: iWorkSchool;
  open: boolean;
  handleClose: () => void;
}

export const RemoveUser = ({ handleClose, open, work, user }: iRemoveProps) => {
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
