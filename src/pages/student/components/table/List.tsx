import { useMemo } from 'react'
import { TableRow, TableCell } from '@mui/material'
import { TableBase } from '../../../../shared/components'
import { iHeadCell, iStudent } from '../../../../shared/interfaces'

interface iTableStudentPageProps {
  data: iStudent[]
}

export const TableStudentPage = ({ data }: iTableStudentPageProps) => {
  const headCells: iHeadCell[] = useMemo(() => {
    return [
      { order: 'registry', numeric: 'right', label: 'Matrícula' },
      { order: 'name', numeric: 'left', label: 'Aluno' },
    ]
  }, [])

  return (
    <TableBase headCells={headCells}>
      {data.map((el) => (
        <TableRow key={el.id}>
          <TableCell align="right">{el.registry}</TableCell>
          <TableCell>{el.name}</TableCell>
        </TableRow>
      ))}
    </TableBase>
  )
}
