import { useDialogContext, useUserContext } from "../../contexts";
import { iDialogUserProps } from "../../interfaces";
import { DialogActive } from "./structure";

export const DialogActiveSchool = ({ user }: iDialogUserProps) => {
  const { handleOpenActive, openActive } = useDialogContext();
  const { updateAllUser } = useUserContext();

  return (
    user && (
      <DialogActive
        action={() => {
          updateAllUser(
            user.id,
            { role: "SERV", is_active: !user.is_active },
            false,
            user.is_active ? "/user" : "/user/" + user.id
          );
          handleOpenActive();
        }}
        description={`o usúario ${user.name.toUpperCase()}`}
        is_active={user.is_active}
        onClose={handleOpenActive}
        open={openActive}
        title="Usuário"
      />
    )
  );
};
