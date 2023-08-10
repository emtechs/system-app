import { FieldValues } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'
import {
  useDialogContext,
  useAppThemeContext,
  apiFrequency,
  iFrequency,
  DialogBaseChildren,
  BaseContentChildren,
  RequestFrequencyCreateSchema,
} from '../../../../shared'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormContainer, TextFieldElement } from 'react-hook-form-mui'

interface iDialogRequestFrequencyProps {
  frequency: iFrequency
}

export const DialogRequestFrequency = ({
  frequency,
}: iDialogRequestFrequencyProps) => {
  const navigate = useNavigate()
  const { handleOpenEdit, openEdit } = useDialogContext()
  const { setLoading, handleError, handleSucess } = useAppThemeContext()

  const createRequest = async (data: FieldValues) => {
    try {
      handleOpenEdit()
      setLoading(true)
      await apiFrequency.createRequest(data)
      handleSucess('A reabertura da frequência foi solicitada com sucesso!')
      navigate(`/${frequency.school.id}/frequency`)
    } catch {
      handleError(
        'No momento, não foi possível solicitar a reabertura da frequência.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <DialogBaseChildren
      open={openEdit}
      onClose={handleOpenEdit}
      title="Solicitar Reabertura de Frequência"
      description={`Você está prestes a solicitar a reabertura de uma frequência que já foi encerrada. Por favor, revise cuidadosamente as informações para garantir que seja a frequência correta antes de prosseguir.`}
    >
      <FormContainer
        defaultValues={{
          frequency_id: frequency.id,
        }}
        onSuccess={createRequest}
        resolver={zodResolver(RequestFrequencyCreateSchema)}
      >
        <BaseContentChildren>
          <Box>
            <Typography>Data: {frequency.date}</Typography>
            <Typography>Turma: {frequency.class.name}</Typography>
            <Typography>Escola: {frequency.school.name}</Typography>
          </Box>
          <TextFieldElement
            name="justification"
            label="Justificativa"
            required
            fullWidth
            margin="dense"
          />
          <Button variant="contained" type="submit" fullWidth>
            Salvar
          </Button>
        </BaseContentChildren>
      </FormContainer>
    </DialogBaseChildren>
  )
}
