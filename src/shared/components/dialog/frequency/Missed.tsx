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
} from '../../../../shared'

interface iDialogMissedProps {
  open: boolean
  onClose: () => void
  student: iFrequencyStudentsBase
  list: () => void
}

export const DialogMissed = ({
  open,
  onClose,
  student,
  list,
}: iDialogMissedProps) => {
  const { setLoading, handleError } = useAppThemeContext()

  const updateFrequencyStudent = useCallback(
    (data: FieldValues) => {
      onClose()
      setLoading(true)
      apiFrequency
        .updateFreqStudent(data, student.id)
        .catch(() =>
          handleError('Não foi possível cadastrar a falta no momento!'),
        )
        .finally(() => {
          setLoading(false)
          list()
        })
    },
    [student],
  )

  const action = () =>
    updateFrequencyStudent({ status: 'MISSED', updated_at: dayjs().format() })

  return (
    <DialogBaseChildrenAction
      open={open}
      onClose={onClose}
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
