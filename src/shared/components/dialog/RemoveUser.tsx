import { useCallback } from "react";
import {
  useAppThemeContext,
  useDialogContext,
  useSchoolContext,
} from "../../contexts";
import { iUser } from "../../interfaces";
import { rolePtBr } from "../../scripts";
import { DialogBase } from "./structure";
import { apiSchool } from "../../services";

interface iRemoveProps {
  user: iUser;
  getUsers: (query: string, take: number) => void;
}

export const RemoveUser = ({ user, getUsers }: iRemoveProps) => {
  const { setLoading, handleSucess, handleError } = useAppThemeContext();
  const { openActive, handleOpenActive } = useDialogContext();
  const { schoolDataRetrieve } = useSchoolContext();

  const deleteServer = useCallback(
    async (school_id: string, server_id: string) => {
      try {
        setLoading(true);
        await apiSchool.deleteServer(school_id, server_id);
        handleSucess("Usuário removido da função com sucesso!");
        getUsers(`?school_id=${school_id}`, 1);
        if (user.work_school && user.work_school.role === "DIRET")
          schoolDataRetrieve(school_id, "");
      } catch {
        handleError("Não foi possível remover o usuário da função no momento!");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return (
    user.work_school && (
      <DialogBase
        open={openActive}
        onClose={handleOpenActive}
        title="Remover Usuário da Função"
        description={`Deseja continuar removendo o usúario ${user.name.toUpperCase()} da
      Função ${rolePtBr(user.work_school.role).toUpperCase()} da Escola ${
          user.work_school.school.name
        }?`}
        action={() => {
          if (user.work_school)
            deleteServer(user.work_school.school.id, user.id);
          handleOpenActive();
        }}
        actionTitle="Continuar"
      />
    )
  );
};
