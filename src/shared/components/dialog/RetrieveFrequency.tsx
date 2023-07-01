import { Box, Typography } from "@mui/material";
import { iFrequencyWithInfreq } from "../../interfaces";
import { useFrequencyContext } from "../../contexts";
import { DialogBaseChildren } from "./structure";

interface iDialogDeleteFrequencyProps {
  open: boolean;
  onClose: () => void;
  frequency: iFrequencyWithInfreq;
}

export const DialogRetrieveFrequency = ({
  open,
  onClose,
  frequency,
}: iDialogDeleteFrequencyProps) => {
  const { updateFrequency, setRetrieveFreq } = useFrequencyContext();
  const action = () => {
    updateFrequency({ status: "OPENED" }, frequency.id, true);
    setRetrieveFreq(undefined);
    onClose();
  };
  return (
    <DialogBaseChildren
      open={open}
      onClose={onClose}
      title="Reabrir Frequência"
      description={`Você está prestes a reabrir uma frequência que já foi encerrada.
            Verifique cuidadosamente as informações para confirmar se é
            realmente a que você deseja reabrir. Se estiver correto, clique em
            "Reabrir". Caso contrário, clique em "Sair".`}
      action={action}
      actionTitle="Reabrir"
    >
      <Box display="flex" flexDirection="column" gap={1} mt={1}>
        <Typography>Data: {frequency.date}</Typography>
        <Typography>Turma: {frequency.class.class.name}</Typography>
        <Typography>Escola: {frequency.class.school.name}</Typography>
      </Box>
    </DialogBaseChildren>
  );
};
