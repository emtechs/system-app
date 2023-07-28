import { Box, Button, Typography } from '@mui/material'
import { iFrequencyStudentsBase } from '../../../interfaces'
import { useFrequencyContext } from '../../../contexts'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import { FormContainer, TextFieldElement } from 'react-hook-form-mui'
import { frequencyUpdateSchema } from '../../../schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogBaseChildrenAction } from '../structure'

interface iDialogMissedProps {
  open: boolean
  onClose: () => void
  student: iFrequencyStudentsBase
}

export const DialogMissed = ({
  open,
  onClose,
  student,
}: iDialogMissedProps) => {
  const { updateFrequencyStudent, setStudentData } = useFrequencyContext()
  const action = () => {
    updateFrequencyStudent(
      { status: 'MISSED', updated_at: dayjs().format() },
      student.id,
    )
    onClose()
  }
  return (
    <DialogBaseChildrenAction
      open={open}
      onClose={onClose}
      title="Informar Falta"
      description={`Você está cadastrando a falta para o aluno ${student.student.name}.
      No campo abaixo, preencha a justificativa da falta caso o
      aluno tenha justificado. Caso contrário, clique no botão
      "Faltou".`}
      action={action}
      actionTitle="Faltou"
    >
      <FormContainer
        onSuccess={(data) => {
          updateFrequencyStudent(data, student.id)
          setStudentData(undefined)
          onClose()
        }}
        resolver={zodResolver(frequencyUpdateSchema)}
      >
        <Box mt={1} display="flex" flexDirection="column" gap={1}>
          <Typography>Matrícula: {student.student.registry}</Typography>
          <Typography>Aluno: {student.student.name}</Typography>
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
