import { DoneAll, RemoveDone, School, Visibility } from "@mui/icons-material";
import { IconButton, TableCell, Tooltip } from "@mui/material";
import { iUser } from "../../../interfaces";
import { useDialogContext, usePaginationContext } from "../../../contexts";

interface iActionsUserProps {
  user: iUser;
  handleUser: (newUser: iUser) => void;
}

export const ActionsUser = ({ handleUser, user }: iActionsUserProps) => {
  const { handleOpenActive } = useDialogContext();
  const { onClickReset } = usePaginationContext();
  const { is_active, id, role } = user;

  const onClickActive = () => {
    handleUser(user);
    handleOpenActive();
  };

  return (
    <TableCell>
      {is_active ? (
        <>
          <Tooltip title="Detalhar">
            <IconButton
              color="primary"
              size="small"
              href={`/user/${id}?data=user`}
              onClick={onClickReset}
            >
              <Visibility fontSize="small" />
            </IconButton>
          </Tooltip>
          {role !== "ADMIN" && (
            <Tooltip title="Liberar Acesso">
              <IconButton color="secondary" size="small" onClick={onClickReset}>
                <School fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Desativar">
            <IconButton color="error" size="small" onClick={onClickActive}>
              <RemoveDone fontSize="small" />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <Tooltip title="Ativar">
          <IconButton color="success" size="small" onClick={onClickActive}>
            <DoneAll fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
    </TableCell>
  );
};
