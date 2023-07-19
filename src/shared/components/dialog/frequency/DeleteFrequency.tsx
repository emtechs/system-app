import { Box, Typography } from "@mui/material";
import { iFrequencyWithInfreq } from "../../../interfaces";
import { useFrequencyContext } from "../../../contexts";
import { DialogBaseChildrenAction } from "../structure";

interface iDialogDeleteFrequencyProps {
  open: boolean;
  onClose: () => void;
  frequency: iFrequencyWithInfreq;
}

export const DialogDeleteFrequency = ({
  open,
  onClose,
  frequency,
}: iDialogDeleteFrequencyProps) => {
  const { destroyFrequency, setRetrieveFreq } = useFrequencyContext();
  const action = () => {
    destroyFrequency(frequency.id);
    setRetrieveFreq(undefined);
    onClose();
  };
  return (
    <DialogBaseChildrenAction
      open={open}
      onClose={onClose}
      title="Excluir Frequência"
      description={`Você está prestes a exluir uma frequência. Verifique cuidadosamente as
      informações para confirmar se é realmente a que você deseja excluir.
      Se estiver correto, clique em "Excluir". Caso contrário, clique em
      "Sair".`}
      action={action}
      actionTitle="Excluir"
    >
      <Box display="flex" flexDirection="column" gap={1} mt={1}>
        <Typography>Data: {frequency.date}</Typography>
        <Typography>Turma: {frequency.class.name}</Typography>
        <Typography>Escola: {frequency.school.name}</Typography>
      </Box>
    </DialogBaseChildrenAction>
  );
};
