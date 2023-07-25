import { TableCell, TableRow } from '@mui/material'
import { TableBase } from '../../../components'
import { iFrequencyHistory, iHeadCell } from '../../../interfaces'
import { statusFrequencyPtBr } from '../../../scripts'

interface iTableHistoryUserProps {
  data: iFrequencyHistory[]
}

export const TableHistoryUser = ({ data }: iTableHistoryUserProps) => {
  const headCells: iHeadCell[] = [
    { numeric: 'left', label: 'Data' },
    { numeric: 'left', label: 'Matrícula' },
    { numeric: 'left', label: 'Aluno' },
    { numeric: 'left', label: 'Escola' },
    { numeric: 'left', label: 'Turma' },
    { numeric: 'left', label: 'Presença' },
  ]

  return (
    <TableBase headCells={headCells}>
      {data.map((el) => (
        <TableRow key={el.id}>
          <TableCell>{el.date}</TableCell>
          <TableCell>{el.student.registry}</TableCell>
          <TableCell>{el.student.name}</TableCell>
          <TableCell>{el.school.name}</TableCell>
          <TableCell>{el.class.name}</TableCell>
          <TableCell>{statusFrequencyPtBr(el.status_student)}</TableCell>
        </TableRow>
      ))}
    </TableBase>
  )
}
