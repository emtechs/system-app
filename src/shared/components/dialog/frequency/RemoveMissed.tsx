import { useCallback } from 'react'
import { Box, Typography } from '@mui/material'
import {
  iFrequencyStudentsBase,
  useAppThemeContext,
  apiFrequency,
  DialogBaseChildrenAction,
  useDialogContext,
  iDialogDataProps,
} from '../../../../shared'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

interface iDialogRemoveMissedProps extends iDialogDataProps {
  student: iFrequencyStudentsBase
}

export const DialogRemoveMissed = ({
  student,
  getData,
}: iDialogRemoveMissedProps) => {
  const { handleError } = useAppThemeContext()
  const { openEdit, handleOpenEdit } = useDialogContext()

  const action = useCallback(() => {
    handleOpenEdit()
    apiFrequency
      .updateFreqStudent(
        {
          status: 'PRESENTED',
          justification: '',
          updated_at: dayjs().format(),
        },
        student.id,
      )
      .catch(() =>
        handleError('Não foi possível cadastrar a falta no momento!'),
      )
      .finally(() => getData && getData())
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
