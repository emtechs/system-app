import { DoneAll, RemoveDone, School, Visibility } from "@mui/icons-material";
import { IconButton, TableCell, Tooltip } from "@mui/material";
import { iUser } from "../../../interfaces";
import { useDialogContext, usePaginationContext } from "../../../contexts";

interface iActionsUserProps {
  user: iUser;
  handleUser: (newUser: iUser) => void;
  school_id?: string;
}

export const ActionsUser = ({
  handleUser,
  user,
  school_id,
}: iActionsUserProps) => {
  const { handleOpenActive, handleOpenEdit } = useDialogContext();
  const { onClickReset } = usePaginationContext();
  const { is_active, id, role } = user;

  const onClickActive = () => {
    handleUser(user);
    handleOpenActive();
  };

  const onClickEdit = () => {
    handleUser(user);
    handleOpenEdit();
  };

  return (
    <TableCell>
      {is_active ? (
        <>
          <Tooltip title="Detalhar">
            <IconButton
              color="primary"
              size="small"
              href={
                school_id
                  ? `/user/${user.id}?school_id=${school_id}`
                  : `/user/${id}`
              }
              onClick={onClickReset}
            >
              <Visibility fontSize="small" />
            </IconButton>
          </Tooltip>
          {role !== "ADMIN" && !school_id && (
            <Tooltip title="Liberar Acesso">
              <IconButton color="secondary" size="small" onClick={onClickEdit}>
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
