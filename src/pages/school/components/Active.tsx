import {
  usePaginationContext,
  useSchoolContext,
} from "../../../shared/contexts";
import { iSchool } from "../../../shared/interfaces";
import { DialogBase } from "../../../shared/components";

interface iActiveProps {
  school: iSchool;
}

export const Active = ({ school }: iActiveProps) => {
  const { openActive, handleOpenActive, updateSchool } = useSchoolContext();
  const { setActive } = usePaginationContext();
  return school.is_active ? (
    <DialogBase
      open={openActive}
      onClose={handleOpenActive}
      title="Desativar Escola"
      description={`Deseja continuar desativando a escola ${school.name.toUpperCase()}?`}
      action={() => {
        updateSchool(
          {
            is_active: false,
          },
          school.id,
          "estado",
          undefined,
          "/school"
        );
        handleOpenActive();
      }}
      actionTitle="Continuar"
    />
  ) : (
    <DialogBase
      open={openActive}
      onClose={handleOpenActive}
      title="Ativar Escola"
      description={`Deseja continuar ativando a Escola ${school.name.toUpperCase()}?`}
      action={() => {
        updateSchool(
          {
            is_active: true,
          },
          school.id,
          "estado"
        );
        setActive(true);
        handleOpenActive();
      }}
      actionTitle="Continuar"
    />
  );
};
