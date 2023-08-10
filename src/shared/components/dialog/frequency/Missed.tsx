import { useCallback } from 'react'
import { Box, Button, Typography } from '@mui/material'
import {
  FieldValues,
  FormContainer,
  TextFieldElement,
} from 'react-hook-form-mui'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import {
  iFrequencyStudentsBase,
  useAppThemeContext,
  apiFrequency,
  frequencyUpdateSchema,
  DialogBaseChildrenAction,
  useDialogContext,
  iDialogDataProps,
} from '../../../../shared'

interface iDialogMissedProps extends iDialogDataProps {
  student: iFrequencyStudentsBase
}

export const DialogMissed = ({ student, getData }: iDialogMissedProps) => {
  const { openEdit, handleOpenEdit } = useDialogContext()
  const { handleError } = useAppThemeContext()
  const updateFrequencyStudent = useCallback(
    (data: FieldValues) => {
      handleOpenEdit()
      apiFrequency
        .updateFreqStudent(data, student.id)
        .catch(() =>
          handleError('Não foi possível cadastrar a falta no momento!'),
        )
        .finally(() => getData && getData())
    },
    [student],
  )

  const action = () =>
    updateFrequencyStudent({ status: 'MISSED', updated_at: dayjs().format() })

  return (
    <DialogBaseChildrenAction
      open={openEdit}
      onClose={handleOpenEdit}
      title="Informar Falta"
      description={`Você está cadastrando a falta para o aluno ${student.name}.
      No campo abaixo, preencha a justificativa da falta caso o
      aluno tenha justificado. Caso contrário, clique no botão
      "Faltou".`}
      action={action}
      actionTitle="Faltou"
    >
      <FormContainer
        onSuccess={updateFrequencyStudent}
        resolver={zodResolver(frequencyUpdateSchema)}
      >
        <Box mt={1} display="flex" flexDirection="column" gap={1}>
          <Typography>Matrícula: {student.registry}</Typography>
          <Typography>Aluno: {student.name}</Typography>
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
        </Box>
      </FormContainer>
    </DialogBaseChildrenAction>
  )
}
