import { Box, Typography } from '@mui/material'
import {
  iDialogDataProps,
  iFrequency,
  useDialogContext,
  useAppThemeContext,
  apiFrequency,
  DialogBaseChildrenAction,
} from '../../../../shared'

interface iDialogRetrieveFrequencyProps extends iDialogDataProps {
  frequency: iFrequency
}

export const DialogRetrieveFrequency = ({
  frequency,
  getData,
}: iDialogRetrieveFrequencyProps) => {
  const { handleOpenEdit, openEdit } = useDialogContext()

  const { setLoading, handleError, handleSucess } = useAppThemeContext()
  const updateFrequency = async () => {
    try {
      handleOpenEdit()
      setLoading(true)
      await apiFrequency.update(
        { status: 'OPENED', finished_at: 0 },
        frequency.id,
      )
      handleSucess('Frequência reaberta com sucesso!')
      getData && getData()
    } catch {
      handleError('Não foi possível reabrir a frequência no momento!')
    } finally {
      setLoading(false)
    }
  }
  return (
    <DialogBaseChildrenAction
      open={openEdit}
      onClose={handleOpenEdit}
      title="Reabrir Frequência"
      description={`Você está prestes a reabrir uma frequência que já foi encerrada.
            Verifique cuidadosamente as informações para confirmar se é
            realmente a que você deseja reabrir. Se estiver correto, clique em
            "Reabrir". Caso contrário, clique em "Sair".`}
      action={updateFrequency}
      actionTitle="Reabrir"
    >
      <Box display="flex" flexDirection="column" gap={1} mt={1}>
        <Typography>Data: {frequency.date}</Typography>
        <Typography>Turma: {frequency.class.name}</Typography>
        <Typography>Escola: {frequency.school.name}</Typography>
      </Box>
    </DialogBaseChildrenAction>
  )
}
