import {
  useDialogContext,
  usePaginationContext,
  useUserContext,
} from "../../../contexts";
import { iDialogUserProps, iLocale } from "../../../interfaces";
import { DialogActive } from "../structure";

interface iDialogActiveUserProps extends iDialogUserProps {
  locale: iLocale;
}

export const DialogActiveUser = ({ locale, user }: iDialogActiveUserProps) => {
  const { onClickReset } = usePaginationContext();
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
            locale,
            user.is_active ? "/user" : "/user/" + user.id
          );
          onClickReset();
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
