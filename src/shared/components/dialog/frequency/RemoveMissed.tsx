import { useCallback } from 'react'
import { Box, Typography } from '@mui/material'
import {
  DialogBaseChildrenAction,
  apiFrequencyStudent,
  iFrequencyDataStudent,
  useAppThemeContext,
  useDialogContext,
} from '../../../../shared'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

interface iDialogRemoveMissedProps {
  student: iFrequencyDataStudent
  handleDataStudents: (id: string, newData: iFrequencyDataStudent) => void
}

export const DialogRemoveMissed = ({
  student,
  handleDataStudents,
}: iDialogRemoveMissedProps) => {
  const { handleError } = useAppThemeContext()
  const { openEdit, handleOpenEdit } = useDialogContext()

  const action = useCallback(() => {
    handleOpenEdit()
    handleDataStudents(student.id, { ...student, is_loading: true })
    apiFrequencyStudent
      .update(
        {
          status: 'PRESENTED',
          justification: '',
          updated_at: dayjs().format(),
        },
        student.id,
      )
      .then((res) =>
        handleDataStudents(res.id, {
          ...res,
          is_loading: false,
          is_error: false,
        }),
      )
      .catch(() => {
        handleDataStudents(student.id, {
          ...student,
          is_loading: false,
          is_error: true,
        })
        handleError('Não foi possível cadastrar a falta no momento!')
      })
  }, [student])

  return (
    <DialogBaseChildrenAction
      open={openEdit}
      onClose={handleOpenEdit}
      title="Retirar Falta"
      description={`Deseja continuar removendo a falta do aluno ${student.name}
      ?`}
      action={action}
      actionTitle="Continuar"
    >
      <Box mt={1} display="flex" flexDirection="column" gap={1}>
        <Typography>Matrícula: {student.registry}</Typography>
        <Typography>Aluno: {student.name}</Typography>
        {student.justification && (
          <Typography>Justificativa: {student.justification}</Typography>
        )}
      </Box>
    </DialogBaseChildrenAction>
  )
}
