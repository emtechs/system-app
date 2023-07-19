import {
  Dashboard,
  DoneAll,
  Edit,
  Person,
  RemoveDone,
  Visibility,
} from "@mui/icons-material";
import { IconButton, TableCell, Tooltip } from "@mui/material";
import { iSchool } from "../../../interfaces";
import { useDialogContext, usePaginationContext } from "../../../contexts";

interface iActionsSchoolProps {
  school: iSchool;
  handleSchool: (newSchool: iSchool) => void;
}

export const ActionsSchool = ({
  handleSchool,
  school,
}: iActionsSchoolProps) => {
  const { handleOpenEdit, handleOpenDirector, handleOpenActive } =
    useDialogContext();
  const { onClickReset } = usePaginationContext();
  const { is_active, id } = school;

  const onClickEdit = () => {
    handleSchool(school);
    handleOpenEdit();
  };

  const onClickDirector = () => {
    handleSchool(school);
    handleOpenDirector();
  };

  const onClickActive = () => {
    handleSchool(school);
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
              href={`/school/${id}`}
              onClick={onClickReset}
            >
              <Visibility fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Painel">
            <IconButton
              color="secondary"
              size="small"
              href={`/home/school/${id}`}
              onClick={onClickReset}
            >
              <Dashboard fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Editar">
            <IconButton color="success" size="small" onClick={onClickEdit}>
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Diretor">
            <IconButton color="primary" size="small" onClick={onClickDirector}>
              <Person fontSize="small" />
            </IconButton>
          </Tooltip>
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
