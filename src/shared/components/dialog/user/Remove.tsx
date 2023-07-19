import {
  useAppThemeContext,
  useDialogContext,
  useUserContext,
} from "../../../contexts";
import { iDialogUserProps } from "../../../interfaces";
import { rolePtBr } from "../../../scripts";
import { DialogBase } from "../structure";
import { apiSchool } from "../../../services";
import { useNavigate } from "react-router-dom";

export const DialogRemoveUser = ({ locale, user }: iDialogUserProps) => {
  const navigate = useNavigate();
  const { setLoading, handleSucess, handleError } = useAppThemeContext();
  const { openActive, handleOpenActive } = useDialogContext();
  const { getUsers } = useUserContext();

  const deleteServer = async (school_id: string, server_id: string) => {
    try {
      setLoading(true);
      await apiSchool.deleteServer(school_id, server_id);
      handleSucess("Usuário removido da função com sucesso!");
      switch (locale) {
        case "data":
          navigate(`/school/${school_id}?view=server`);
          break;

        case "list":
          getUsers(`?school_id=${school_id}`);
          break;
      }
    } catch {
      handleError("Não foi possível remover o usuário da função no momento!");
    } finally {
      setLoading(false);
    }
  };

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
