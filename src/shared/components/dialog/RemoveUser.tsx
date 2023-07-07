import { useCallback } from "react";
import {
  useAppThemeContext,
  useDialogContext,
  useSchoolContext,
} from "../../contexts";
import { iSchool, iSchoolServer } from "../../interfaces";
import { rolePtBr } from "../../scripts";
import { DialogBase } from "./structure";
import { apiSchool } from "../../services";

interface iRemoveProps {
  work: iSchoolServer;
  school: iSchool;
  getServers: (id: string, query: string, take: number) => void;
}

export const RemoveUser = ({ school, work, getServers }: iRemoveProps) => {
  const { setLoading, handleSucess, handleError } = useAppThemeContext();
  const { openActive, handleOpenActive } = useDialogContext();
  const { schoolDataRetrieve } = useSchoolContext();

  const deleteServer = useCallback(
    async (school_id: string, server_id: string) => {
      try {
        setLoading(true);
        await apiSchool.deleteServer(school_id, server_id);
        handleSucess("Usuário removido da função com sucesso!");
        getServers(school_id, "", 1);
        if (work.role === "DIRET") schoolDataRetrieve(school_id);
      } catch {
        handleError("Não foi possível remover o usuário da função no momento!");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return (
    <DialogBase
      open={openActive}
      onClose={handleOpenActive}
      title="Remover Usuário da Função"
      description={`Deseja continuar removendo o usúario ${work.server.name.toUpperCase()} da
      Função ${rolePtBr(work.role).toUpperCase()} da Escola ${school.name}?`}
      action={() => {
        deleteServer(school.id, work.server.id);
        handleOpenActive();
      }}
      actionTitle="Continuar"
    />
  );
};
