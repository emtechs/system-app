import { Box, Typography } from '@mui/material'
import {
  DialogBaseChildrenAction,
  apiFrequency,
  iDialogDataProps,
  iFrequency,
  useAppThemeContext,
  useDialogContext,
} from '../../../../shared'

interface iDialogDeleteFrequencyProps extends iDialogDataProps {
  frequency: iFrequency
}

export const DialogDeleteFrequency = ({
  frequency,
  getData,
}: iDialogDeleteFrequencyProps) => {
  const { handleOpenActive, openActive } = useDialogContext()
  const { setLoading, handleError, handleSucess } = useAppThemeContext()
  const destroyFrequency = async () => {
    try {
      handleOpenActive()
      setLoading(true)
      await apiFrequency.destroy(frequency.id)
      handleSucess('Frequência deletada com sucesso!')
      getData && getData()
    } catch {
      handleError('Não foi possível deletar a frequência no momento!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <DialogBaseChildrenAction
      open={openActive}
      onClose={handleOpenActive}
      title="Excluir Frequência"
      description={`Você está prestes a excluir uma frequência. Verifique cuidadosamente as
      informações para confirmar se é realmente a que você deseja excluir.
      Se estiver correto, clique em "Excluir". Caso contrário, clique em
      "Sair".`}
      action={destroyFrequency}
      actionTitle="Excluir"
    >
      <Box display="flex" flexDirection="column" gap={1} mt={1}>
        <Typography>Data: {frequency.date}</Typography>
        <Typography>Turma: {frequency.class.name}</Typography>
        <Typography>Escola: {frequency.school.name}</Typography>
      </Box>
    </DialogBaseChildrenAction>
  )
}
