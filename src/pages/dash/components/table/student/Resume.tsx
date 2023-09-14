import { TableRow, TableCell } from '@mui/material'
import {
  useSchoolContext,
  useBgColorInfrequency,
  iHeadCell,
  TableBase,
} from '../../../../../shared'

export const TableDashboardSchoolResumePage = () => {
  const { schoolResume } = useSchoolContext()
  const { defineBgColorInfrequency } = useBgColorInfrequency()

  const headCells: iHeadCell[] = [
    { numeric: 'left', label: 'Matrícula' },
    { numeric: 'left', label: 'Aluno' },
    { numeric: 'left', label: 'Turma' },
    { numeric: 'right', label: 'Infrequência' },
  ]

  return (
    <TableBase headCells={headCells}>
      {schoolResume.slice(0, 3).map((el) => (
        <TableRow key={el.id}>
          <TableCell>{el.registry}</TableCell>
          <TableCell>{el.name}</TableCell>
          <TableCell>{el.class.name}</TableCell>
          <TableCell
            align="right"
            sx={{
              color: '#fff',
              bgcolor: defineBgColorInfrequency(el.infrequency),
            }}
          >
            {el.infrequency.toFixed(0)}%
          </TableCell>
        </TableRow>
      ))}
    </TableBase>
  )
}
