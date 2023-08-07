import { useCallback } from 'react'
import { Box, Typography } from '@mui/material'
import {
  iFrequencyStudentsBase,
  useAppThemeContext,
  apiFrequency,
  DialogBaseChildrenAction,
} from '../../../../shared'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

interface iDialogRemoveMissedProps {
  open: boolean
  onClose: () => void
  student: iFrequencyStudentsBase
  list: () => void
}

export const DialogRemoveMissed = ({
  open,
  onClose,
  student,
  list,
}: iDialogRemoveMissedProps) => {
  const { setLoading, handleError } = useAppThemeContext()

  const action = useCallback(() => {
    onClose()
    setLoading(true)
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
      .finally(() => {
        setLoading(false)
        list()
      })
  }, [student])

  return (
    <DialogBaseChildrenAction
      open={open}
      onClose={onClose}
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
