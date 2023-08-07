import { TableCell, TableRow } from '@mui/material'
import {
  iHeadCell,
  iFrequencyStudentsBase,
  useAppThemeContext,
  defineBgColorFrequency,
  statusFrequencyPtBr,
  useFrequencyContext,
  DialogBaseChildrenAction,
  PaginationBase,
  TableBase,
  usePaginationContext,
  apiFrequency,
} from '../../../../shared'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const headCells: iHeadCell[] = [
  { numeric: 'left', label: 'Matrícula' },
  { numeric: 'left', label: 'Aluno' },
  { numeric: 'left', label: 'Estado da Presença' },
]

interface iCardFrequencyProps {
  student: iFrequencyStudentsBase
}

const CardFrequency = ({ student }: iCardFrequencyProps) => {
  const { theme } = useAppThemeContext()

  return (
    <TableRow>
      <TableCell>{student.student.registry}</TableCell>
      <TableCell>{student.student.name}</TableCell>
      <TableCell
        sx={{
          bgcolor: defineBgColorFrequency(student.status, theme),
          color: theme.palette.secondary.contrastText,
        }}
      >
        {statusFrequencyPtBr(student.status)}
      </TableCell>
    </TableRow>
  )
}

interface iDialogFinishFrequencyProps {
  open: boolean
  onClose: () => void
  frequency_id: string
}

export const DialogFinishFrequency = ({
  open,
  onClose,
  frequency_id,
}: iDialogFinishFrequencyProps) => {
  const { school_id } = useParams()
  const { updateFrequency } = useFrequencyContext()
  const { setCount, setIsLoading, query_page } = usePaginationContext()
  const [alterStudents, setAlterStudents] = useState<iFrequencyStudentsBase[]>(
    [],
  )

  useEffect(() => {
    const queryData =
      '?by=asc&order=name&isNot_presented=true' + query_page(2, true)
    setIsLoading(true)
    apiFrequency
      .students(frequency_id, queryData)
      .then((res) => {
        setCount(res.total)
        setAlterStudents(res.result)
      })
      .finally(() => setIsLoading(false))
  }, [frequency_id, query_page])

  const action = () => {
    updateFrequency(
      {
        is_open: false,
        finished_at: Date.now(),
      },
      frequency_id,
      undefined,
      `/${school_id}`,
    )
    onClose()
  }

  return (
    <DialogBaseChildrenAction
      open={open}
      onClose={onClose}
      title="Conferência"
      description={
        'Abaixo estão listados os alunos que você definiu como faltantes ou justificados. Por favor, verifique a listagem e, se estiver correta, clique em continuar para lançar a frequência no sistema.'
      }
      action={action}
      actionTitle="Continuar"
    >
      <TableBase
        headCells={headCells}
        message="Todos os alunos estão presentes."
      >
        {alterStudents.map((el) => (
          <CardFrequency key={el.id} student={el} />
        ))}
      </TableBase>
      <PaginationBase />
    </DialogBaseChildrenAction>
  )
}
